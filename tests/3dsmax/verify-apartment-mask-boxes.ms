/*
    ISOLATED HEADLESS TEST SCENES ONLY. This harness resets the current scene.
    Do not run in a working production scene.

    ADMIRAL_MASK_SCRIPT: absolute path to GENERATED AdmiralApartmentMaskBoxes.ms
    ADMIRAL_MASK_TEST_LOG: optional absolute output log path.
    Alternatively set global AdmiralMaskBoxes_TestScript before fileIn.
*/

global AdmiralMaskBoxes_TestScript
global AdmiralMaskBoxes_RuntimePassed = false
global AdmiralMaskBoxes_AutoRun = false
global AdmiralCreateApartmentMaskBoxes

(
fn AdmiralVerifyApartmentMaskBoxes =
(
    local scriptPath = (dotNetClass "System.Environment").GetEnvironmentVariable "ADMIRAL_MASK_SCRIPT"
    if scriptPath == undefined or scriptPath == "" do scriptPath = AdmiralMaskBoxes_TestScript
    if scriptPath == undefined or scriptPath == "" do throw "Set ADMIRAL_MASK_SCRIPT to the generated script path."
    if not doesFileExist scriptPath do throw ("Generated script not found: " + scriptPath)

    fn check condition message =
    (
        if not condition do throw ("Admiral mask test: " + message)
    )

    fn near a b = abs (a - b) < 0.0001

    fn byteFromHex text startIndex =
    (
        local digits = "0123456789ABCDEF"
        local hi = findString digits (toUpper (substring text startIndex 1))
        local lo = findString digits (toUpper (substring text (startIndex + 1) 1))
        if hi == undefined or lo == undefined do throw "Invalid mask hex metadata."
        ((hi - 1) * 16 + (lo - 1))
    )

    fn setTestUnits unitType =
    (
        units.SystemType = unitType
        units.SystemScale = 1.0
        units.DisplayType = #Metric
        units.MetricType = unitType
    )

    fn ownedCount =
    (
        local result = 0
        for node in objects where (getUserPropVal node "AdmiralMaskOwner" asString:true) == "admiral-park-mask-v1" do result += 1
        result
    )

    resetMaxFile #noPrompt
    setTestUnits #Centimeters
    fileIn scriptPath quiet:true
    check (objects.count == 0) "Auto-run suppression must create no objects."

    local nodes = AdmiralCreateApartmentMaskBoxes()
    check (nodes.count == 69) "First run must return 69 nodes."
    check (ownedCount() == 69) "First run must create 69 owned boxes."
    local ids = #()
    local colors = #()

    for node in nodes do
    (
        local id = getUserPropVal node "ApartmentId" asString:true
        local hex = getUserPropVal node "MaskHex" asString:true
        check (id != undefined and hex != undefined) "Every box needs ID and hex metadata."
        check ((findItem ids id) == 0) "Apartment IDs must be unique."
        check ((findItem colors hex) == 0) "Mask colors must be unique."
        append ids id
        append colors hex
        check ((classOf node.baseObject) == Box) ("Not a Box: " + id)
        check (near node.height 315.0) ("Incorrect centimetre height: " + id)
        check (near node.length 500.0) ("Incorrect centimetre length: " + id)
        check (near node.width 1000.0) ("Incorrect centimetre width: " + id)
        check (node.colorByLayer == false) ("Object color must override layer color: " + id)
        check (near node.wirecolor.r (byteFromHex hex 2)) ("Red / hex mismatch: " + id)
        check (near node.wirecolor.g (byteFromHex hex 4)) ("Green / hex mismatch: " + id)
        check (near node.wirecolor.b (byteFromHex hex 6)) ("Blue / hex mismatch: " + id)
        check (node.name == ("AP_MASK_" + id)) ("Incorrect initial name: " + id)
        check (node.layer.name == ("AP_MASKS_" + substring id 1 1)) ("Incorrect initial layer: " + id)
        check ((getUserPropVal node "MaskPaletteVersion") == 1) ("Incorrect palette version: " + id)
    )

    -- A user's placed and edited geometry must survive a palette refresh.
    local edited = nodes[1]
    local testParent = Dummy name:"Admiral mask test parent"
    edited.parent = testParent
    edited.pos = [123.0, 456.0, 789.0]
    rotate edited (angleaxis 17 [0, 0, 1])
    edited.height = 231.0
    edited.width = 987.0
    edited.length = 456.0
    edited.name = "User positioned apartment mask"
    edited.material = standardMaterial name:"Admiral mask preserve material"
    hide edited
    local expectedTransform = edited.transform
    local expectedMaterial = edited.material
    select testParent

    local refreshed = AdmiralCreateApartmentMaskBoxes()
    check (refreshed.count == 69 and ownedCount() == 69) "Rerun must not create duplicates."
    for index = 1 to nodes.count do check (refreshed[index] == nodes[index]) "Rerun must return the same node instances."
    check (edited.transform == expectedTransform) "Rerun changed the user's transform."
    check ((near edited.height 231.0) and (near edited.width 987.0) and (near edited.length 456.0)) "Rerun changed edited geometry."
    check (edited.parent == testParent) "Rerun changed parenting."
    check (edited.material == expectedMaterial) "Rerun changed material."
    check (edited.name == "User positioned apartment mask") "Rerun renamed an existing node."
    check (edited.isHidden == true) "Rerun changed visibility."
    check (selection.count == 1 and selection[1] == testParent) "Default execution changed selection."

    -- The dimensions must remain centimetres even when system units are metres.
    resetMaxFile #noPrompt
    setTestUnits #Meters
    local meterNodes = AdmiralCreateApartmentMaskBoxes()
    check (meterNodes.count == 69) "Metre-system scene needs 69 boxes."
    for node in meterNodes do
    (
        check (near node.height 3.15) "Height failed metre conversion."
        check (near node.length 5.0) "Length failed metre conversion."
        check (near node.width 10.0) "Width failed metre conversion."
    )
    check (units.SystemType == #Meters and (near units.SystemScale 1.0)) "Script changed system units."

    -- A reserved name belonging to another object must fail before creation.
    resetMaxFile #noPrompt
    setTestUnits #Centimeters
    local collision = box name:"AP_MASK_A001"
    local didThrow = false
    try (AdmiralCreateApartmentMaskBoxes()) catch (didThrow = true)
    check didThrow "An unowned reserved-name collision must throw."
    check (objects.count == 1 and isValidNode collision) "Name preflight made partial changes."

    -- Unknown owned IDs must fail before any new box is created.
    resetMaxFile #noPrompt
    local unknown = box name:"Unknown owned mask"
    setUserPropVal unknown "AdmiralMaskOwner" "admiral-park-mask-v1"
    setUserPropVal unknown "ApartmentId" "Z999"
    didThrow = false
    try (AdmiralCreateApartmentMaskBoxes()) catch (didThrow = true)
    check didThrow "Unknown owned apartment ID must throw."
    check (objects.count == 1 and isValidNode unknown) "Unknown-ID preflight made partial changes."

    -- Cloning an owned ID creates an ambiguity. Refuse the whole operation.
    resetMaxFile #noPrompt
    local duplicateNodes = AdmiralCreateApartmentMaskBoxes()
    local duplicate = copy duplicateNodes[1]
    setUserPropVal duplicate "AdmiralMaskOwner" "admiral-park-mask-v1"
    setUserPropVal duplicate "ApartmentId" (getUserPropVal duplicateNodes[1] "ApartmentId" asString:true)
    duplicateNodes[1].wirecolor = color 0 0 0
    didThrow = false
    try (AdmiralCreateApartmentMaskBoxes()) catch (didThrow = true)
    check didThrow "Duplicate owned apartment IDs must throw."
    check (ownedCount() == 70) "Duplicate preflight created or deleted objects."
    check (duplicateNodes[1].wirecolor == (color 0 0 0)) "Duplicate preflight modified an earlier box."

    -- Missing owned nodes can be recreated without changing survivors.
    delete duplicate
    delete duplicateNodes[69]
    local survivor = duplicateNodes[1]
    survivor.pos = [100, 200, 300]
    local repaired = AdmiralCreateApartmentMaskBoxes selectCreated:true
    check (repaired.count == 69 and ownedCount() == 69) "Repair must restore exactly 69 apartment masks."
    check (repaired[1] == survivor and survivor.pos == [100, 200, 300]) "Repair changed a surviving node."
    check (selection.count == 1 and selection[1] == repaired[69]) "Explicit selectCreated must select only the new box."

    true
)

local testLogPath = (dotNetClass "System.Environment").GetEnvironmentVariable "ADMIRAL_MASK_TEST_LOG"
local testLog = undefined
if testLogPath != undefined and testLogPath != "" do testLog = createFile testLogPath

try
(
    AdmiralVerifyApartmentMaskBoxes()
    AdmiralMaskBoxes_RuntimePassed = true
    format "ADMIRAL_MASK_TEST_PASS\n"
    if testLog != undefined do format "ADMIRAL_MASK_TEST_PASS\n" to:testLog
)
catch
(
    local failure = getCurrentException()
    format "ADMIRAL_MASK_TEST_FAIL: %\n" failure
    if testLog != undefined do format "ADMIRAL_MASK_TEST_FAIL: %\n" failure to:testLog
    if testLog != undefined do close testLog
    throw()
)

if testLog != undefined do close testLog
)
