"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewContractModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ContractSchema = new mongoose_1.default.Schema({
    id: {
        required: true,
        type: String,
    },
    contractName: {
        required: true,
        type: String,
    },
    firstAssignmentGroup: {
        required: true,
        type: String,
    },
    company: {
        required: true,
        type: String,
    },
    servicePackage: {
        required: true,
        type: String,
    },
    netSuiteProjectID: {
        required: true,
        type: String,
    },
    firstAssigmentAgent: {
        required: true,
        type: String,
    },
    serviceItem: {
        required: true,
        type: Array,
    },
    startDate: {
        required: true,
        type: Date,
    },
    endDate: {
        required: true,
        type: Date,
    },
    contractHours: {
        required: true,
        type: Number,
    },
    contractOwner: {
        required: true,
        type: Number,
    },
    contractOwnerName: {
        required: true,
        type: String,
    },
    typeOfHours: {
        required: true,
        type: String,
    },
    sla: {
        required: true,
        type: String,
    },
    country: {
        required: true,
        type: String,
    },
    assets: {
        required: true,
        type: Array,
    },
    supportTime: {
        required: true,
        type: String,
    },
    customerUser: {
        required: true,
        type: String,
    },
    projectManager: {
        required: true,
        type: String,
    },
    remarks: {
        required: false,
        type: String,
    },
    createdDate: {
        required: true,
        type: Date,
    },
    files: {
        required: true,
        type: Boolean,
    },
    consumedHours: {
        required: true,
        type: Number,
    },
    companyID: {
        required: true,
        type: Number,
    },
    remainingHours: {
        required: true,
        type: Number,
    },
    customerUserID: {
        required: true,
        type: Number,
    },
    firstAssigmentAgentID: {
        required: true,
        type: Number,
    },
    deactivated: {
        required: true,
        type: Boolean,
    },
    fileKey: {
        required: false,
        type: String,
    },
    fileType: {
        required: false,
        type: String,
    },
});
const newContractSchema = new mongoose_1.default.Schema({
    id: {
        required: true,
        type: String,
    },
    contractName: {
        required: true,
        type: String,
    },
    firstAssignmentGroup: {
        required: true,
        type: String,
    },
    company: {
        required: true,
        type: String,
    },
    servicePackage: {
        required: true,
        type: String,
    },
    netSuiteProjectID: {
        required: true,
        type: String,
    },
    firstAssigmentAgent: {
        required: true,
        type: String,
    },
    serviceItem: {
        required: true,
        type: Array,
    },
    startDate: {
        required: true,
        type: Date,
    },
    endDate: {
        required: true,
        type: Date,
    },
    contractHours: {
        required: true,
        type: Number,
    },
    contractOwner: {
        required: true,
        type: Number,
    },
    contractOwnerName: {
        required: true,
        type: String,
    },
    typeOfHours: {
        required: true,
        type: String,
    },
    sla: {
        required: true,
        type: String,
    },
    country: {
        required: true,
        type: String,
    },
    assets: {
        required: true,
        type: Array,
    },
    supportTime: {
        required: true,
        type: String,
    },
    customerUser: {
        required: true,
        type: String,
    },
    projectManager: {
        required: true,
        type: String,
    },
    remarks: {
        required: false,
        type: String,
    },
    createdDate: {
        required: true,
        type: Date,
    },
    files: {
        required: true,
        type: Boolean,
    },
    consumedHours: {
        required: true,
        type: Number,
    },
    companyID: {
        required: true,
        type: Number,
    },
    remainingHours: {
        required: true,
        type: Number,
    },
    customerUserID: {
        required: true,
        type: Number,
    },
    firstAssigmentAgentID: {
        required: true,
        type: Number,
    },
    deactivated: {
        required: true,
        type: Boolean,
    },
    fileKey: {
        required: false,
        type: String,
    },
    fileType: {
        required: false,
        type: String,
    },
});
const ContractModel = mongoose_1.default.model("contract", ContractSchema);
const NewContractModel = mongoose_1.default.model("contracts", newContractSchema);
exports.NewContractModel = NewContractModel;
exports.default = ContractModel;
