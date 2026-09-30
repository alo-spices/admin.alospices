import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-parties-view-details',
  templateUrl: './parties-view-details.component.html',
  styleUrls: ['./parties-view-details.component.css']
})
export class PartiesViewDetailsComponent {
  constructor(
    private dialogRef:
      MatDialogRef<PartiesViewDetailsComponent>,

    @Inject(MAT_DIALOG_DATA)
    public party: any
  ) { }


  // ==========================================
  // CLOSE
  // ==========================================

  close(): void {

    this.dialogRef.close();

  }


  // ==========================================
  // FORMAT DATE
  // ==========================================

  formatDate(date: string): string {

    if (!date) {
      return '-';
    }

    return new Date(date).toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    );
  }


  // ==========================================
  // FORMAT AMOUNT
  // ==========================================

  formatAmount(amount: number): string {

    return Number(
      amount || 0
    ).toLocaleString(
      'en-IN',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    );
  }


  // ==========================================
  // CALL
  // ==========================================

  callShop(): void {

    if (this.party?.mobile) {

      window.open(
        `tel:${this.party.mobile}`,
        '_self'
      );

    }
  }


  // ==========================================
  // WHATSAPP
  // ==========================================

  openWhatsApp(): void {

    const number =
      this.party?.whatsappNumber ||
      this.party?.mobile;

    if (!number) {
      return;
    }

    const cleanNumber =
      number.replace(/\D/g, '');

    window.open(
      `https://wa.me/91${cleanNumber}`,
      '_blank'
    );
  }


  // ==========================================
  // GOOGLE MAP
  // ==========================================

  openLocation(): void {

    if (
      this.party?.latitude &&
      this.party?.longitude
    ) {

      const url =
        `https://www.google.com/maps/search/?api=1&query=${this.party.latitude},${this.party.longitude}`;

      window.open(
        url,
        '_blank'
      );

      return;
    }


    const address = [
      this.party?.address,
      this.party?.city,
      this.party?.district,
      this.party?.state,
      this.party?.pincode
    ]
      .filter(Boolean)
      .join(', ');


    if (!address) {
      return;
    }


    const url =
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

    window.open(
      url,
      '_blank'
    );
  }
}
