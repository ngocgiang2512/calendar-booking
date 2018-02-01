import Promise from 'bluebird';

export function getCoachInfo(coachId) {
  return new Promise((resolve, reject) => {
    resolve({
      "id": "coach1",
      "name": "James Stoke",
      "email": "james@coachingcloud.com",
      "type": "coach",
      "calendar": {
        "availableBlocks": [
          {
            "id": "block2",
            "timeBegin": "2018-2-14 00:15:00",
            "timeEnd": "2018-2-14 00:30:00"
          },
          {
            "id": "block3",
            "timeBegin": "2018-2-14 00:30:00",
            "timeEnd": "2018-2-14 00:45:00"
          },
        ],
        "events": [
          {
            "id": "event1",
            "client": {
              "id": "client1",
              "name": "Dat Pham",
              "email": "dat@coachingcloud.com",
              "type": "client"
            },
            "coach": {
              "id": "coach1",
              "name": "James Stoke",
              "email": "james@coachingcloud.com",
              "type": "coach"
            },
            "name": "One-to-one session",
            "blocks": [
              {
                "id": "block1",
                "timeBegin": "2018-2-14 00:00:00",
                "timeEnd": "2018-2-14 00:15:00"
              }
            ],
            "location": "Skype"
          }
        ]
      }
    })
  })
}

export function getClientInfo() {
  return new Promise((resolve, reject) => {
    resolve({
      "id": "client1",
      "name": "Dat Pham",
      "email": "dat@coachingcloud.com",
      "type": "client",
      "calendar": {
        "events": [
          {
            "id": "event1",
            "client": {
              "id": "client1",
              "name": "Dat Pham",
              "email": "dat@coachingcloud.com",
              "type": "client"
            },
            "coach": {
              "id": "coach1",
              "name": "James Stoke",
              "email": "james@coachingcloud.com",
              "type": "coach"
            },
            "name": "One-to-one session",
            "blocks": [
              {
                "id": "block1",
                "timeBegin": "2018-2-14 00:00:00",
                "timeEnd": "2018-2-14 00:15:00"
              }
            ],
            "location": "Skype"
          }
        ]
      }
    })
  })
}

export function getSessionTemplates() {
  return new Promise((resolve, reject) => {
    resolve([
      { id: 'tpl1', name: 'Normal session', location: 'Skype', duration: 30 },
      { id: 'tpl2', name: 'One-to-one session', location: 'Skype', duration: 15 },
      { id: 'tpl3', name: 'Long session', location: 'Skype', duration: 45 },
      { id: 'tpl4', name: 'Extra session', location: 'Skype', duration: 60 },
    ])
  })
}

export function bookSession(templateId, coachId, timeBegin, timeEnd) {
  return new Promise((resolve, reject) => {
    resolve({
      "id": "event2",
      "client": {
        "id": "client1",
        "name": "Dat Pham",
        "email": "dat@coachingcloud.com",
        "type": "client"
      },
      "coach": {
        "id": "coach1",
        "name": "James Stoke",
        "email": "james@coachingcloud.com",
        "type": "coach"
      },
      "name": "Normal session",
      "blocks": [
        {
          "id": "block2",
          "timeBegin": "2018-2-14 00:15:00",
          "timeEnd": "2018-2-14 00:30:00"
        },
        {
          "id": "block3",
          "timeBegin": "2018-2-14 00:30:00",
          "timeEnd": "2018-2-14 00:45:00"
        }
      ],
      "location": "Skype"
    })
  })
}

export function removeSession(eventId) {
  return new Promise((resolve, reject) => {
    resolve({
      "id": "event2",
      "isDeleted": true,
    })
  })
}
