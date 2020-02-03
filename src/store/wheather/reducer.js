import { ADD, UPDATE, LIST_USERS, DELETE } from "./actionType";

export const initialState = {
  placesArray: {
    India: [
      {
        "id": 1264527,
        "name": "Chennai",
        "findname": "CHENNAI",
        "country": "IN",
        "coord": {
          "lon": 80.278473,
          "lat": 13.08784
        },
      },
      {
        "id": 1275339,
        "name": "Mumbai",
        "findname": "MUMBAI",
        "country": "IN",
        "coord": {
          "lon": 72.847939,
          "lat": 19.01441
        },
      },
      {
        "id": 1277333,
        "name": "Bangalore",
        "findname": "BANGALORE",
        "country": "IN",
        "coord": {
          "lon": 77.603287,
          "lat": 12.97623
        },
      },
      {
        "id": 1176734,
        "name": "Hyderabad",
        "findname": "HYDERABAD",
        "country": "PK",
        "coord": {
          "lon": 68.373657,
          "lat": 25.39242
        },
      },
    ],
    SriLanka: [{
      "id": 1248991,
      "name": "Colombo",
      "findname": "COLOMBO",
      "country": "LK",
      "coord": {
        "lon": 79.847778,
        "lat": 6.93194
      },
    },
    {
      "id": 1233369,
      "name": "Negombo",
      "findname": "NEGOMBO",
      "country": "LK",
      "coord": {
        "lon": 79.8358,
        "lat": 7.2083
      },
    }, {
      "id": 1242110,
      "name": "Kalmunai",
      "findname": "KALMUNAI",
      "country": "LK",
      "coord": {
        "lon": 81.816673,
        "lat": 7.41667
      },
    }, {
      "id": 1225018,
      "name": "Vavuniya",
      "findname": "VAVUNIYA",
      "country": "LK",
      "coord": {
        "lon": 80.497101,
        "lat": 8.7514
      },
    }],
  }
};

const wheatherReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default wheatherReducer;
