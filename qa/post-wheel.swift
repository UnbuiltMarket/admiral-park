import CoreGraphics
import Foundation

// Use the WindowServer input path independently of SafariDriver's wheel source.
let values = CommandLine.arguments.dropFirst().compactMap(Double.init)
guard values.count == 3 else { exit(2) }
let point = CGPoint(x: values[0], y: values[1])
let source = CGEventSource(stateID: .hidSystemState)
guard let move = CGEvent(mouseEventSource: source, mouseType: .mouseMoved,
                         mouseCursorPosition: point, mouseButton: .left),
      let scroll = CGEvent(scrollWheelEvent2Source: source, units: .pixel, wheelCount: 1,
                           wheel1: Int32(-values[2]), wheel2: 0, wheel3: 0) else { exit(3) }
move.post(tap: .cghidEventTap)
Thread.sleep(forTimeInterval: 0.1)
scroll.location = point
scroll.post(tap: .cghidEventTap)
print("Quartz accessibility permission", CGPreflightPostEventAccess())
