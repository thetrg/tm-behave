export const SAMPLE_RUNNER_DATA = {
  "only": [],
  "registry": {
    "1": {
      "id": 1,
      "isRoot": true,
      "keyword": "feature",
      "name": "root spec",
      "parent": 0,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0
      },
      "children": [
        2,
      ]
    },
    "2": {
      "id": 2,
      "keyword": "feature:",
      "name": "Google Searching",
      "parent": 1,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0
      },
      "children": [
        3, 4, 8,
      ]
    },
    "3": {
      "id": 3,
      "keyword": "as",
      "name": "a web surfer, I want to search Google, so that I can learn new things",
      "parent": 2,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0
      },
      "children": []
    },
    "4": {
      "id": 4,
      "keyword": "scenario:",
      "name": "simple google search for pandas",
      "parent": 2,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0
      },
      "children": [5, 6, 7]
    },
    "5": {
      "id": 5,
      "keyword": "given",
      "name": "a web browser is on the Google page",
      "parent": 4,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0
      },
      "children": []
    },
    "6": {
      "id": 6,
      "keyword": "when",
      "name": "the search phrase \"panda\" is entered",
      "parent": 4,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0
      },
      "children": []
    },
    "7": {
      "id": 6,
      "keyword": "then",
      "name": "results for \"panda\" are shown",
      "parent": 4,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0
      },
      "children": []
    },
    "8": {
      "id": 8,
      "keyword": "scenario:",
      "name": "simple google search for elephants",
      "parent": 2,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0
      },
      "children": [9, 10, 11]
    },
    "9": {
      "id": 9,
      "keyword": "given",
      "name": "a web browser is on the Google page",
      "parent": 8,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0
      },
      "children": []
    },
    "10": {
      "id": 10,
      "keyword": "when",
      "name": "the search phrase \"panda\" is entered",
      "parent": 8,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0
      },
      "children": []
    },
    "11": {
      "id": 11,
      "keyword": "then",
      "name": "results for \"panda\" are shown",
      "parent": 8,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0
      },
      "children": []
    },

    /*
    "3": {
      "id": 3,
      "isRoot": false,
      "name": "sample spec 1/1",
      "parent": 2,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0,
        "status": "pass"
      }
    },
    "4": {
      "id": 4,
      "isRoot": false,
      "name": "sample spec 1/2",
      "parent": 2,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0,
        "status": "pass"
      }
    },
    "5": {
      "id": 5,
      "isRoot": false,
      "name": "sample spec 1/3",
      "parent": 2,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0
      },
      "children": [
        6
      ]
    },
    "6": {
      "id": 6,
      "isRoot": false,
      "name": "sample spec 1/3/1",
      "parent": 5,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0
      },
      "children": [
        7,
        8
      ]
    },
    "7": {
      "id": 7,
      "isRoot": false,
      "name": "sample spec 1/3/1/1",
      "parent": 6,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0,
        "status": "pass"
      }
    },
    "8": {
      "id": 8,
      "isRoot": false,
      "name": "sample spec 1/3/1/2",
      "parent": 6,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0
      }
    },
    "9": {
      "id": 9,
      "isRoot": false,
      "keyword": "feature",
      "name": "sample spec 2",
      "parent": 1,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0,
        "status": "pass"
      }
    },
    "10": {
      "id": 10,
      "isRoot": false,
      "keyword": "feature",
      "name": "sample spec 3",
      "parent": 1,
      "stats": {
        "duration": 0,
        "end": 0,
        "result": "todo",
        "start": 0,
        "status": "pass"
      }
    }
    */
  },
  "name": "Spec Runner",
  "root": 1,
  "idcounter": 10,
  "stats": {
    "fail": 0,
    "pass": 5,
    "todo": 1
  }
}
