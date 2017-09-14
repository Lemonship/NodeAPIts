"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const CategoryEntity_1 = require("./CategoryEntity");
const TaskEntity_1 = require("./TaskEntity");
let activity = class activity {
    constructor() {
        this.Name = "";
        //this.Category = 0;
    }
};
activity.EntityName = "Activity";
activity.ClassName = "activity";
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], activity.prototype, "ID", void 0);
__decorate([
    typeorm_1.Column("nvarchar"),
    __metadata("design:type", String)
], activity.prototype, "Name", void 0);
__decorate([
    typeorm_1.ManyToOne(type => CategoryEntity_1.category, Category => Category.ID),
    typeorm_1.JoinColumn({ name: "CategoryID" }),
    __metadata("design:type", CategoryEntity_1.category)
], activity.prototype, "Category", void 0);
__decorate([
    typeorm_1.OneToMany(type => TaskEntity_1.task, Task => Task.ID),
    __metadata("design:type", Array)
], activity.prototype, "Tasks", void 0);
activity = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [])
], activity);
exports.activity = activity;
