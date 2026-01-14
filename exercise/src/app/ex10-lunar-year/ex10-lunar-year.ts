import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LunarYear } from './lunar-year.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-ex10-lunar-year',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './ex10-lunar-year.html',
    styleUrls: ['./ex10-lunar-year.css']
})
export class Ex10LunarYearComponent implements OnInit {
    days: number[] = [];
    months: number[] = [];
    years: number[] = [];

    selectedDay: number = 15;
    selectedMonth: number = 5;
    selectedYear: number = 1986;

    lunarResult: any = null;

    constructor() { }

    ngOnInit(): void {
        // Populate Days using binding mechanism
        for (let i = 1; i <= 31; i++) {
            this.days.push(i);
        }
        // Populate Months using binding mechanism
        for (let i = 1; i <= 12; i++) {
            this.months.push(i);
        }
        // Populate Years (e.g., 1900 to 2100) using binding mechanism
        for (let i = 1900; i <= 2100; i++) {
            this.years.push(i);
        }
    }

    convert() {
        // Parse values to numbers since select returns strings
        const day = Number(this.selectedDay);
        const month = Number(this.selectedMonth);
        const year = Number(this.selectedYear);
        const lunar = new LunarYear(day, month, year);
        this.lunarResult = lunar.findLunarYearDetail();
    }
}
