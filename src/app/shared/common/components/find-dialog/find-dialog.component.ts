import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IGame } from 'app/modules/report/report';
import { ToasterService } from 'app/shared/core/services/toaster.service';
import { FindDialogService } from './find-dialog.service';

@Component({
  selector: 'app-find-dialog',
  templateUrl: './find-dialog.component.html',
  styleUrls: ['./find-dialog.component.scss']
})
export class FindDialogComponent implements OnInit {
  name: string;
  gamesData: IGame[] = [];
  dataSource = new MatTableDataSource<IGame>(this.gamesData);
  displayedColumns: string[] = ['nameBack', 'providerId', 'actions'];
  selectedGame: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<FindDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private findDialogService: FindDialogService,
    private toast: ToasterService,
  ) { }

  ngOnInit(): void {
  }

  games() {
    let headers = [];
    headers.push({ key: 'game_name', val: this.name });

    this.findDialogService.games({ headers: headers }).subscribe({
      next: (result) => {
        this.dataSource.data = result.data.items.map(i => this._formatItem(i));
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.toast.error({ message: err['kindMessage'] });
      }
    })
  }

  _formatItem(item: IGame) {
    let providerName = this.data.providers.find((a: any) => a.providerId == item.providerId);
    item.providerId = providerName.name;
    return item;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
