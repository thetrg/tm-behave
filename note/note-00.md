
thetrg/game/hyperlinktothepast/player/_item/browser
thetrg/game/hyperlinktothepast/player/_item/browser/dom
thetrg/game/hyperlinktothepast/player/_item/browser/dom
thetrg/game/hyperlinktothepast/player/_item/browser/dom
thetrg/game/hyperlinktothepast/player/_item/browser/svg
thetrg/game/hyperlinktothepast/player/_item/browser/impactjs
thetrg/game/hyperlinktothepast/player/_item/browser/threejs

# NOTE: In some circumstances where more breakdown of a layer 
# should happen, consider something like:
thetrg/game/hyperlinktothepast/player/_item/browser/threejs/ui
thetrg/game/hyperlinktothepast/player/_item/browser/threejs/logic

thetrg/game/hyperlinktothepast/player/_item/common
thetrg/game/hyperlinktothepast/player/_item/server

## Software Layers and Abstractions

- browser
  - dom-interface
  - impact-interface
  - svg-interface
  - threejs-interface
- server
  - terminal-interface
  - logic

- app - small self contained program
- behaviour - tied to a FSM (Finite State Machine)

- player
  - browser
    - dom
      - ui
      - display
      - logic
    - svg
      - ui
      - logic
    - threejs
      - ui
      - logic
  - server
    - terminal
      - ui
      - logic

NOTE: _<some path> would help to show an internal reference?

languages: python, ruby, cyber (https://fubark.github.io/cyber/), perl (https://perldoc.perl.org/perlintro#Basic-syntax-overview)

- item
  - thetrg/behave/autobot/browser
  - thetrg/behave/autobot/browser/_item/browser
  - thetrg/behave/autobot/browser/_item/common
  - thetrg/behave/autobot/browser/_item/server
  - thetrg/behave/autobot/browser/_item/server/ui
  - thetrg/behave/autobot/browser/_item/server/logic
  - thetrg/behave/autobot/browser/page/_item/server/logic
  - thetrg/behave/autobot/browser/page/element/_item/server/logic



thetrg/game/hyperlinktothepast/player/_item/data
thetrg/game/hyperlinktothepast/player/_item/info
thetrg/game/hyperlinktothepast/player/_item/link
thetrg/game/hyperlinktothepast/player/_item/temp

thetrg/game/hyperlinktothepast/player/_item/browser/data
thetrg/game/hyperlinktothepast/player/_item/browser/info
thetrg/game/hyperlinktothepast/player/_item/browser/link
thetrg/game/hyperlinktothepast/player/_item/browser/temp
thetrg/game/hyperlinktothepast/player/_item/common/info
thetrg/game/hyperlinktothepast/player/_item/common/data
thetrg/game/hyperlinktothepast/player/_item/common/link
thetrg/game/hyperlinktothepast/player/_item/common/temp
thetrg/game/hyperlinktothepast/player/_item/server/info
thetrg/game/hyperlinktothepast/player/_item/server/data
thetrg/game/hyperlinktothepast/player/_item/server/link
thetrg/game/hyperlinktothepast/player/_item/server/temp
thetrg/game/hyperlinktothepast/player/hammer/_item/server/temp



thetrg/game/hyperlinktothepast/player/_item/dom/browser/ui
thetrg/game/hyperlinktothepast/player/_item/dom/browser/logic


thetrg/game/hyperlinktothepast/player/dom/_browser/ui/_internal/
thetrg/game/hyperlinktothepast/player/dom/_browser/ui/_internal/info
thetrg/game/hyperlinktothepast/player/dom/_browser/ui/_internal/data
thetrg/game/hyperlinktothepast/player/dom/_browser/ui/_internal/link
thetrg/game/hyperlinktothepast/player/dom/_browser/ui/_internal/temp

thetrg/game/hyperlinktothepast/player/dom/_browser/logic/_internal
thetrg/game/hyperlinktothepast/player/dom/_browser/logic/_internal/info
thetrg/game/hyperlinktothepast/player/dom/_browser/logic/_internal/data
thetrg/game/hyperlinktothepast/player/dom/_browser/logic/_internal/link
thetrg/game/hyperlinktothepast/player/dom/_browser/logic/_internal/temp


thetrg/game/hyperlinktothepast/player/dom/_internal/info
thetrg/game/hyperlinktothepast/player/dom/_internal/data
thetrg/game/hyperlinktothepast/player/dom/_internal/temp

thetrg/game/hyperlinktothepast/player/dom/_browser/ui
thetrg/game/hyperlinktothepast/player/dom/_browser/logic
thetrg/game/hyperlinktothepast/player/dom/_common/logic
thetrg/game/hyperlinktothepast/player/dom/_server/ui
thetrg/game/hyperlinktothepast/player/dom/_server/logic

thetrg/game/hyperlinktothepast/player/terminal/browser/ui
thetrg/game/hyperlinktothepast/player/terminal/browser/logic
thetrg/game/hyperlinktothepast/player/terminal/common/logic
thetrg/game/hyperlinktothepast/player/terminal/server/ui
thetrg/game/hyperlinktothepast/player/terminal/server/logic




thetrg/game/hyperlinktothepast/player/browser/dom/ui
thetrg/game/hyperlinktothepast/player/browser/dom/logic
thetrg/game/hyperlinktothepast/player/server/terminal/ui
thetrg/game/hyperlinktothepast/player/server/terminal/logic