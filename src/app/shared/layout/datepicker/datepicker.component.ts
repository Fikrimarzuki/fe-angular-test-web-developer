import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { faCaretUp, faCaretDown, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-datepicker",
  templateUrl: "./datepicker.component.html"
})
export class DatePicker implements OnInit {
  faCaretUp= faCaretUp;
  faCaretDown=faCaretDown;
  faAngleLeft=faAngleLeft;
  faAngleRight=faAngleRight;
  datePayload = {
    day: 0,
    month: 0, // month - 1
    year: 0
  }
  day=new Date()
  month=new Date().getMonth()
  year=new Date().getFullYear()
  isShow=false
  months=[
    { name: "January", short: "Jan" },
    { name: "February", short: "Feb" },
    { name: "March", short: "Mar" },
    { name: "April", short: "Apr" },
    { name: "May", short: "May" },
    { name: "June", short: "Jun" },
    { name: "July", short: "Jul" },
    { name: "August", short: "Aug" },
    { name: "September", short: "Sep" },
    { name: "October", short: "Oct" },
    { name: "November", short: "Nov" },
    { name: "December", short: "Dec" }
  ]
  days=[
    { name: "Monday", short: "Mon" },
    { name: "Tuesday", short: "Tue" },
    { name: "Wednesday", short: "Wed" },
    { name: "Thursday", short: "Thu" },
    { name: "Friday", short: "Fri" },
    { name: "Saturday", short: "Sat" },
    { name: "Sunday", short: "Sun" }
  ]
  monthDate=[{ dt: new Date() }]

  ngOnInit(): void {
    this.getMonthDate()
  }

  @Input() placeholder = "Date";
  @Input() key_name = "";
  @Output() changeDate = new EventEmitter();

  getMonth() {
    const m = this.month
    return this.months[m].short
  }

  lastMonthWeek(month: number) {
    return new Date(
      Date.UTC(this.year, month, -6)
    )
  }

  endMonthDate(month: number) {
    const d = new Date(
      Date.UTC(this.year, month, 0)
    )
    return d
  }

  getDateString() {
    const day = this.datePayload.day
    const month = this.months[this.datePayload.month].short
    const year = this.datePayload.year
    return `${day} ${month} ${year}`
  }

  toggleCalendar(): void {
    this.isShow = !this.isShow
  }

  goPrevMonth() {
    if (this.month === 0) {
      this.year -= 1
    }
    const prevMonth = new Date(
      Date.UTC(this.year, this.month - 1, 1)
    )
    this.month = prevMonth.getMonth()
  }

  goNextMonth() {
    if (this.month === 11) {
      this.year += 1
    }
    const nextMonth = new Date(
      Date.UTC(this.year, this.month + 1, 1)
    )
    this.month = nextMonth.getMonth()
  }

  prevWeek() {
    const prevWeekDate = new Date(
      Date.UTC(this.year, this.month - 1, this.lastMonthWeek(this.month).getDate())
    )
    let isDay = false
    let fltrd = []
    for (let i = 1; i <= 7; i++) {
      let d = prevWeekDate.toLocaleDateString("id-ID", { weekday: "long" })
      if (i !== 1 && d === "Senin") {
        isDay = true
      }
      if (isDay) {
        fltrd.push({ dt: new Date(prevWeekDate) })
      }
      prevWeekDate.setDate(prevWeekDate.getDate() + 1)
    }
    return fltrd
  }

  getMonthDate() {
    const lastDate = this.endMonthDate(this.month + 1).getDate()
    let fltred = []
    for(let i = 1; i <= lastDate; i++) {
      fltred.push({ dt: new Date(this.year, this.month, i )})
    }
    this.monthDate = fltred
    return fltred
  }

  selectDate(dt: Date) {
    if (this.isMoreDate(dt)) return
    this.day = dt
    this.datePayload = {
      day: dt.getDate(),
      month: dt.getMonth(),
      year: dt.getFullYear()
    }
    this.isShow = false
    this.changeDate.emit({ key: this.key_name, value: this.day })
  }

  isMoreDate(dt: Date) {
    if (this.year > dt.getFullYear()) return true
    if (this.year === dt.getFullYear()) {
      if (this.month > dt.getMonth()) return true
      if (this.month === dt.getMonth()) {  
        if (this.day.getDate() < dt.getDate()) return true
      }
    }
    return false
  }
}
