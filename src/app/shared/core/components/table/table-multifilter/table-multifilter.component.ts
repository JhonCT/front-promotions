import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from 'app/shared/core/services/local-storage.service';
import { ExportCsvService } from '../../../services/export-csv.service';
import { IFilter } from '../multi-filter/multi-filter.interface';
import { MultiFilterComponent } from '../multi-filter/multi-filter.component';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-table-multifilter',
  templateUrl: './table-multifilter.component.html',
  styleUrls: ['./table-multifilter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableMultifilterComponent implements OnInit {

  @Input() tableId: string;
  @Input() columns: any[];
  @Input() pageSize: string;
  @Input() pageSizeOptions: string[];
  @Input() pageIndex: string;
  @Input() totalRecords: string;

  @Input() actions = false;
  @Input() index = false;

  @Input() filters: IFilter[];
  @Input() showFilters = false;
  filterSelected: any[] = [];

  @Input() showBtnDownload = false;
  @Input() showBtnAdd = false;
  @Input() showBtnReload = false;
  @Input() showChooseColumns = false;
  @Input() showGroupByOptions = false;
  @Input() showTotals = false;

  menuGroups: any;
  menuOptionDefaultSelected: String;
  numberDaysReport: Number;
  dateStart: String;
  dateEnd: String;
  provider: String;
  player: String;
  game: String;
  idColumn: String;
  dayColumn: String;
  totalString: String;

  @ViewChild(MatMenuTrigger) menu: MatMenuTrigger;

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MultiFilterComponent)
  multifilter: MultiFilterComponent;

  @Output() clicBtn = new EventEmitter();
  @Output() runFilter = new EventEmitter();
  @Output() newRegister = new EventEmitter();
  @Output() changePages = new EventEmitter();
  @Output() onClickGroupOption = new EventEmitter();

  columnsSelected = new FormControl();

  constructor(
    private lsSvc: LocalStorageService,
    private eCvsSvc: ExportCsvService
  ) {
  }

  ngOnInit(): void {
    this.columnsSelected.setValue(this.handleDisplayCols());
  }

  handleDisplayCols(): string[] {
    // this.lsSvc.remove(`tc_${this.tableId}`);
    let lsCols = this.lsSvc.getItem(`tc_${this.tableId}`, true);
    if (lsCols) {
      this.displayedColumns = lsCols;
    } else {
      this.displayedColumns = this.columns.filter(column => column.show).map(column => column.key);
      this.index && this.displayedColumns.unshift('index');
      this.actions && this.displayedColumns.push('actions');
    }
    return this.displayedColumns;
  }

  chargeDataTable({ rows, filters }): void {
    this.dataSource = new MatTableDataSource<any>(rows);
    !this.totalRecords && (this.dataSource.paginator = this.paginator);
    this.showFilters && this.multifilter.chargeFilter();
  }

  handleAction(action, row: any): void {
    this.clicBtn.emit({ action: action.action, row });
  }

  handleFilter(event: any[]): void {
    this.filterSelected = event;
    console.log('this.filterSelected', this.filterSelected);
    this.handleRefresh();
  }

  handleRefresh(): void {
    this.runFilter.emit(this.filterSelected);
  }

  handleNew(): void {
    this.newRegister.emit(true);
  }

  exportToCsv(): void {
    const data = this.dataSource.filteredData.map(item => {
      let newItem = {};
      this.columns.map(row => {
        newItem[row.key] = item[row.key];
      });
      return newItem;
    });

    this.eCvsSvc.exportCsv('', data, false, this.columns.map(i => i.header));
  }

  chooseColumns(event): void {
    this.lsSvc.setItem(`tc_${this.tableId}`, event, true);
    this.handleDisplayCols();
  }

  handleChangePage(e) {
    this.changePages.emit(e);
  }

  handleGroupOption(menuOption) {
    this.menuOptionDefaultSelected = menuOption.val;
    this.onClickGroupOption.emit(menuOption);
  }

  getTotals(key: any) {
    if (key == this.idColumn) {
      return this.totalString;
    }
    if (key == this.dayColumn) {
      return this.numberDaysReport;
    }
    if (this.player) {
      return 1;
    }

    let data = this.dataSource.filteredData.map(t => t[key]);

    let result = data.map(i => parseFloat(i)).reduce((acc, value) => acc + value, 0);

    let response: any;

    if (result) {
      response = result.toString().includes('.') ? result.toFixed(2) : result;
    } else {
      let counter = new Set(data);
      response = counter.size;
    }

    return response;
  }
}
