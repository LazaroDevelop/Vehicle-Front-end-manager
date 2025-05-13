import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Page } from '../../models/vehicle.model';

@Component({
  selector: 'paginator-ui',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  pageSizeOptions: number[] = [5, 8, 10, 20];

  @Input('page') currentPage: number = 0;
  @Input('size') pageSize: number = 0;
  @Input('total') totalRecords: number = 0;

  @Output('changed') pageChanged = new EventEmitter<Page>();

  constructor() {}

  ngOnInit() {}

  onSelection(event: any) {
    this.pageSize = Number.parseInt(event.value);
    this.pageChanged.emit({ page: this.currentPage, size: this.pageSize });
  }

  onPageChange(page: number) {
    if (page < 0 || page >= this.totalRecords) {
      return;
    }

    this.currentPage = page;
    this.pageChanged.emit({ page: this.currentPage, size: this.pageSize });
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
