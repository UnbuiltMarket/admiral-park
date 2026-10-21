/*
    Admiral Park apartment mask boxes - palette version 1.
    Generated from the canonical apartment ID / mask-color mapping.

    New boxes: height 315 cm, length 500 cm, width 1000 cm.
    The flat nine-column grid is a staging palette, NOT apartment placement.
    Move / reshape the boxes to your apartments after creating them.

    Re-running updates owned object colors and metadata only. Existing
    geometry, transforms, names, parenting, materials and visibility remain.
    The script does not change scene units, render settings or cameras.

    Set global AdmiralMaskBoxes_AutoRun = false before fileIn for tooling.
    Run AdmiralCreateApartmentMaskBoxes selectCreated:true to select only
    newly created objects. Normal execution preserves the current selection.
*/

global AdmiralMaskBoxes_AutoRun
global AdmiralCreateApartmentMaskBoxes

fn AdmiralCreateApartmentMaskBoxes selectCreated:false =
(
    local paletteVersion = 1
    local ownerTag = "admiral-park-mask-v1"
    local rows = #(
        #("A001", 32, 128, 224, "#2080E0", "A"),
        #("A002", 224, 128, 32, "#E08020", "A"),
        #("A003", 32, 224, 32, "#20E020", "A"),
        #("A004", 224, 32, 224, "#E020E0", "A"),
        #("A005", 80, 32, 128, "#502080", "A"),
        #("A006", 128, 176, 128, "#80B080", "A"),
        #("A101", 32, 128, 80, "#208050", "A"),
        #("A102", 32, 224, 176, "#20E0B0", "A"),
        #("A103", 128, 32, 32, "#802020", "A"),
        #("A104", 128, 80, 224, "#8050E0", "A"),
        #("A105", 128, 224, 224, "#80E0E0", "A"),
        #("A106", 176, 80, 128, "#B05080", "A"),
        #("A107", 176, 224, 32, "#B0E020", "A"),
        #("A201", 224, 176, 176, "#E0B0B0", "A"),
        #("A202", 32, 32, 224, "#2020E0", "A"),
        #("A203", 128, 128, 32, "#808020", "A"),
        #("A204", 224, 32, 32, "#E02020", "A"),
        #("A205", 32, 32, 80, "#202050", "A"),
        #("A301", 32, 80, 32, "#205020", "A"),
        #("A302", 32, 80, 128, "#205080", "A"),
        #("A303", 32, 176, 128, "#20B080", "A"),
        #("A304", 80, 80, 80, "#505050", "A"),
        #("B001", 80, 80, 176, "#5050B0", "B"),
        #("B002", 80, 128, 128, "#508080", "B"),
        #("B003", 80, 176, 32, "#50B020", "B"),
        #("B004", 80, 176, 176, "#50B0B0", "B"),
        #("B005", 80, 224, 80, "#50E050", "B"),
        #("B006", 128, 32, 176, "#8020B0", "B"),
        #("B101", 128, 128, 176, "#8080B0", "B"),
        #("B102", 176, 32, 80, "#B02050", "B"),
        #("B103", 176, 80, 32, "#B05020", "B"),
        #("B104", 176, 128, 80, "#B08050", "B"),
        #("B105", 176, 128, 224, "#B080E0", "B"),
        #("B106", 176, 224, 128, "#B0E080", "B"),
        #("B107", 224, 32, 128, "#E02080", "B"),
        #("B201", 224, 80, 80, "#E05050", "B"),
        #("B202", 224, 80, 176, "#E050B0", "B"),
        #("B203", 224, 128, 128, "#E08080", "B"),
        #("B204", 224, 176, 80, "#E0B050", "B"),
        #("B205", 224, 224, 224, "#E0E0E0", "B"),
        #("B206", 32, 32, 32, "#202020", "B"),
        #("B207", 32, 32, 128, "#202080", "B"),
        #("B301", 32, 32, 176, "#2020B0", "B"),
        #("B302", 32, 80, 80, "#205050", "B"),
        #("B303", 32, 80, 176, "#2050B0", "B"),
        #("B304", 32, 80, 224, "#2050E0", "B"),
        #("C001", 32, 128, 32, "#208020", "C"),
        #("C002", 32, 128, 128, "#208080", "C"),
        #("C003", 32, 128, 176, "#2080B0", "C"),
        #("C004", 32, 176, 32, "#20B020", "C"),
        #("C005", 32, 176, 80, "#20B050", "C"),
        #("C006", 32, 176, 176, "#20B0B0", "C"),
        #("C007", 32, 176, 224, "#20B0E0", "C"),
        #("C008", 32, 224, 80, "#20E050", "C"),
        #("C101", 32, 224, 128, "#20E080", "C"),
        #("C102", 32, 224, 224, "#20E0E0", "C"),
        #("C103", 80, 32, 32, "#502020", "C"),
        #("C104", 80, 32, 80, "#502050", "C"),
        #("C105", 80, 32, 176, "#5020B0", "C"),
        #("C106", 80, 32, 224, "#5020E0", "C"),
        #("C201", 80, 80, 32, "#505020", "C"),
        #("C202", 80, 80, 128, "#505080", "C"),
        #("C203", 80, 80, 224, "#5050E0", "C"),
        #("C204", 80, 128, 32, "#508020", "C"),
        #("C205", 80, 128, 80, "#508050", "C"),
        #("C301", 80, 128, 176, "#5080B0", "C"),
        #("C302", 80, 128, 224, "#5080E0", "C"),
        #("C303", 80, 176, 80, "#50B050", "C"),
        #("C304", 80, 176, 128, "#50B080", "C")
    )

    local boxHeight = units.decodeValue "315cm"
    local boxLength = units.decodeValue "500cm"
    local boxWidth = units.decodeValue "1000cm"
    local gap = units.decodeValue "100cm"
    local gridColumns = 9
    local gridOrigin = [0, 0, 0]

    local apartmentIds = #()
    local maskHexes = #()
    local allNodes = #()
    local createdNodes = #()
    local sceneNodes = objects as array

    -- Validate the complete palette and scene before making any changes.
    if rows.count != 69 do throw "Admiral masks: the palette must contain exactly 69 apartments."

    for row in rows do
    (
        if row.count != 6 do throw "Admiral masks: malformed palette row."
        if (findItem apartmentIds row[1]) != 0 do throw ("Admiral masks: duplicate palette apartment " + row[1])
        if (findItem maskHexes row[5]) != 0 do throw ("Admiral masks: duplicate palette color " + row[5])
        if (findItem #("A", "B", "C") row[6]) == 0 do throw ("Admiral masks: unknown building for " + row[1])
        for channelIndex = 2 to 4 do
        (
            local channelValue = row[channelIndex]
            if channelValue < 0 or channelValue > 255 or channelValue != (channelValue as integer) do
                throw ("Admiral masks: invalid RGB channel for " + row[1])
        )
        if row[2] == 0 and row[3] == 0 and row[4] == 0 do
            throw ("Admiral masks: black is reserved for background, not " + row[1])
        append apartmentIds row[1]
        append maskHexes row[5]
        append allNodes undefined
    )

    for sceneNode in sceneNodes do
    (
        if (getUserPropVal sceneNode "AdmiralMaskOwner" asString:true) == ownerTag do
        (
            local existingId = getUserPropVal sceneNode "ApartmentId" asString:true
            local rowIndex = findItem apartmentIds existingId
            if rowIndex == 0 do
                throw ("Admiral masks: owned object has an unknown or missing ApartmentId: " + sceneNode.name)
            if allNodes[rowIndex] != undefined do
                throw ("Admiral masks: multiple owned objects use ApartmentId " + existingId + ". Resolve the duplicate before running again.")
            allNodes[rowIndex] = sceneNode
        )
    )

    for rowIndex = 1 to rows.count do
    (
        local reservedName = "AP_MASK_" + rows[rowIndex][1]
        for sceneNode in sceneNodes where (toLower sceneNode.name) == (toLower reservedName) do
        (
            if sceneNode != allNodes[rowIndex] do
                throw ("Admiral masks: reserved object name already belongs to another object: " + reservedName)
        )
    )

    undo "Admiral apartment mask boxes" on
    (
        with redraw off
        (
            with animate off
            (
                for rowIndex = 1 to rows.count do
                (
                    local row = rows[rowIndex]
                    local maskNode = allNodes[rowIndex]

                    if maskNode == undefined do
                    (
                        local layerName = "AP_MASKS_" + row[6]
                        local maskLayer = LayerManager.getLayerFromName layerName
                        if maskLayer == undefined do maskLayer = LayerManager.newLayerFromName layerName

                        local gridColumn = mod (rowIndex - 1) gridColumns
                        local gridRow = floor ((rowIndex - 1) / (gridColumns as float))
                        local stagingPosition = gridOrigin + [gridColumn * (boxWidth + gap), -gridRow * (boxLength + gap), 0]

                        maskNode = box name:("AP_MASK_" + row[1]) height:boxHeight length:boxLength width:boxWidth pos:stagingPosition
                        maskLayer.addNode maskNode
                        allNodes[rowIndex] = maskNode
                        append createdNodes maskNode
                    )

                    maskNode.colorByLayer = false
                    maskNode.wirecolor = color row[2] row[3] row[4]
                    setUserPropVal maskNode "AdmiralMaskOwner" ownerTag
                    setUserPropVal maskNode "ApartmentId" row[1]
                    setUserPropVal maskNode "MaskHex" row[5]
                    setUserPropVal maskNode "MaskPaletteVersion" paletteVersion
                )

                if selectCreated and createdNodes.count > 0 do select createdNodes
            )
        )
    )

    format "Admiral masks: % apartments; % boxes created; % existing objects refreshed.\n" rows.count createdNodes.count (rows.count - createdNodes.count)
    format "New boxes are on AP_MASKS_A / AP_MASKS_B / AP_MASKS_C in a flat staging grid.\n"
    allNodes
)

if AdmiralMaskBoxes_AutoRun != false do AdmiralCreateApartmentMaskBoxes()
