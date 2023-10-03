"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
const { port, database_url } = index_1.default;
const run = async () => {
    try {
        await mongoose_1.default
            .connect(database_url)
            .then(() => console.log('database connected successfully'));
        app_1.default.listen(port, () => {
            console.log(`server is running on port ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
run().catch(error => console.log(error));
