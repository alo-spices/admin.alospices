export interface Attendance {

  _id?: string;

  employee:
    string | UserReference;

  attendanceDate:
    Date | string;

  checkInTime?:
    Date | string | null;

  checkInLatitude?:
    number | null;

  checkInLongitude?:
    number | null;

  checkInAddress?:
    string;

  checkInSelfie?:
    string;

  checkOutTime?:
    Date | string | null;

  checkOutLatitude?:
    number | null;

  checkOutLongitude?:
    number | null;

  checkOutAddress?:
    string;

  checkOutSelfie?:
    string;

  totalWorkingMinutes?:
    number;

  totalVisits?:
    number;

  totalOrders?:
    number;

  totalCollections?:
    number;

  attendanceStatus?:
    'Present'
    | 'Absent'
    | 'Half Day';

  status?:
    'CheckedIn'
    | 'CheckedOut';

  isDeleted?:
    boolean;

  createdAt?:
    Date | string;

  updatedAt?:
    Date | string;
}

export interface UserReference {

  _id: string;

  firstName?: string;

  lastName?: string;

  fullName?: string;

  employeeCode?: string;

  mobile?: string;

  role?: string;
}
// ==========================================
// ATTENDANCE SUMMARY
// ==========================================

export interface AttendanceSummary {

  employeeId?: string;

  employeeName?: string;

  totalWorkingDays?: number;

  present?: number;

  absent?: number;

  halfDay?: number;

  totalOrders?: number;

  totalVisits?: number;

  totalCollections?: number;

  totalWorkingMinutes?: number;

}