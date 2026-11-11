import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-employee-order',
  templateUrl: './view-employee-order.component.html',
  styleUrls: ['./view-employee-order.component.css']
})
export class ViewEmployeeOrderComponent {
  constructor(
    private dialogRef: MatDialogRef<ViewEmployeeOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public order: any
  ) { }

  close(): void {
    this.dialogRef.close();
  }

  formatDate(date: any): string {
    if (!date) return '-';

    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  formatDateTime(date: any): string {
    if (!date) return '-';

    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getOrderStatusClass(status: string): string {
    switch (status) {
      case 'Approved':
        return 'status-approved';

      case 'Pending':
        return 'status-pending';

      case 'Rejected':
        return 'status-rejected';

      case 'Cancelled':
        return 'status-cancelled';

      case 'Delivered':
        return 'status-delivered';

      default:
        return 'status-default';
    }
  }

  getPaymentStatusClass(status: string): string {
    switch (status) {
      case 'Paid':
        return 'payment-paid';

      case 'Pending':
        return 'payment-pending';

      case 'Partial':
        return 'payment-partial';

      case 'Overdue':
        return 'payment-overdue';

      default:
        return 'payment-default';
    }
  }

  getEmployeeName(): string {
    if (!this.order?.employee) return '-';

    return this.order.employee.fullName ||
      `${this.order.employee.firstName || ''} ${this.order.employee.lastName || ''}`.trim() ||
      '-';
  }

  getPartyName(): string {
    return this.order?.party?.partyName ||
      this.order?.party?.shopName ||
      '-';
  }

  getSourceType(): string {
    return this.order?.employee?.assignmentType || '-';
  }
}
