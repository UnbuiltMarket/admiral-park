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
__APARTMENT_MASK_ROWS__
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
