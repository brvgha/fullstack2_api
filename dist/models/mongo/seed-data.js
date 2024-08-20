"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedData = void 0;
const passwordHash = __importStar(require("password-hash"));
let forecast = [];
exports.seedData = {
    users: {
        _model: "User",
        homer: {
            firstName: "Homer",
            lastName: "Simpson",
            email: "homer@simpson.com",
            password: passwordHash.generate("secret"),
        },
        marge: {
            firstName: "Marge",
            lastName: "Simpson",
            email: "marge@simpson.com",
            password: passwordHash.generate("secret"),
        },
        bart: {
            firstName: "Bart",
            lastName: "Simpson",
            email: "bart@simpson.com",
            password: passwordHash.generate("secret"),
        },
    },
    placemarks: {
        _model: "PlaceMark",
        placemark1: {
            name: "The Elysian",
            city: "Cork",
            country: "Ireland",
            user: "->users.bart",
            lat: 51.896676,
            lng: -8.463367,
            weather: "Rain",
            tempC: 10,
            tempF: 50,
            min_temp: 5,
            max_temp: 12,
            wind_spd: 4,
            wind_direction_deg: 0,
            wind_direction_txt: "N",
            humidity: 90,
            img: [],
            forecast: forecast
        },
        placemark2: {
            name: "Empire State Building",
            city: "New York",
            country: "United States of America",
            user: "->users.marge",
            lat: 40.74844,
            lng: -73.98566,
            weather: "Rain",
            tempC: 10,
            tempF: 50,
            min_temp: 5,
            max_temp: 12,
            wind_spd: 4,
            wind_direction_deg: 0,
            wind_direction_txt: "N",
            humidity: 90,
            img: [],
            forecast: forecast
        },
        placemark3: {
            name: "Burj Khalifa",
            city: "Dubai",
            country: "United Arab Emirates",
            user: "->users.homer",
            lat: 25.19703,
            lng: 55.27413,
            weather: "Sunny",
            tempC: 10,
            tempF: 50,
            min_temp: 5,
            max_temp: 12,
            wind_spd: 4,
            wind_direction_deg: 0,
            wind_direction_txt: "N",
            humidity: 90,
            img: [],
            forecast: forecast
        },
    },
    info: {
        _model: "Info",
        one: {
            category: "Building",
            desc: "Tallest Building in Ireland",
            visits: 4,
            placemark: "->placemarks.placemark1",
            user: "->users.bart",
        },
        two: {
            category: "Building",
            desc: "Previously Tallest Building in the World",
            visits: 1,
            placemark: "->placemarks.placemark2",
            user: "->users.marge",
        },
        three: {
            category: "Building",
            desc: "Current Tallest Building in the World",
            visits: 1,
            placemark: "->placemarks.placemark3",
            user: "->users.homer",
        },
    },
};
