import {Component, OnInit} from '@angular/core';
import {
  ADD_JOB_CATEGORY_URL,
  ADMIN_URL,
  EDIT_JOB_CATEGORY_URL,
  JOB_CATEGORY_URL, UPDATE_JOB_CATEGORY_URL
} from "../../core/utility/navigation-url";
import {Router} from "@angular/router";
import {ResponseModel} from "../../core/lib/model/response.model";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ConfirmDialogComponent} from "../../core/lib/components/confirm-dialog/confirm-dialog.component";
import {EventService} from "../../all-view/app-services/event.service";
import {JobCategoryModel} from "../../all-view/models/job-category.model";
import {JobCategoryService} from "../../all-view/app-services/job-category.service";

@Component({
  selector: 'app-job-category',
  templateUrl: './job-category.component.html',
  styleUrls: ['./job-category.component.scss']
})
export class JobCategoryComponent implements OnInit {
  categoriesList: JobCategoryModel[];

  constructor(
    private _router: Router,
    private _jobCategoryService: JobCategoryService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _eventService: EventService
  ) {
    this.categoriesList = [];
  }
  confirmDelete(category: JobCategoryModel) {
    this.openDeleteDialog(category);
  }
  ngOnInit() {
    this._eventService.setHeader("Job Categories");
    this._jobCategoryService.getList().then((res: ResponseModel) => {
      if (res.responseStatus) {
        this.categoriesList = res.result;
      } else {
        this.categoriesList = [];
      }
    });
  }

  createCategory() {
    let finalUrl = "/" + ADMIN_URL + "/" + ADD_JOB_CATEGORY_URL;
    this._router.navigateByUrl(finalUrl);
  }


  openDeleteDialog(category: JobCategoryModel) : void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {title: "Confirm", content: "Do you really want to delete this job category? If you do this, all active jobs that use this category will be deleted."}
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteJobCategory(category);
      }

    });
  }

  editCategory(category: JobCategoryModel) {
    let finalUrl = "/" + ADMIN_URL + "/" + UPDATE_JOB_CATEGORY_URL + "/" + category.id;
    this._router.navigateByUrl(finalUrl);
  }

  deleteJobCategory(category: JobCategoryModel) {
    var categoryName = category.name;
    this._jobCategoryService.delete(category.id.toString()).then((res: ResponseModel) => {
      if (res.responseStatus) {
        this._jobCategoryService.getList().then((res: ResponseModel) => {
          if (res.responseStatus) {
            this.categoriesList = res.result;
          } else {
            this.categoriesList = [];
          }
        });
      }
      this._snackBar.open("Job category '"+categoryName+"' deleted successfully.", "OK", {
        duration: 6000,
        verticalPosition: 'top'
      });
    });
  }

  /*openDialog(category: JobCategoryModel): void {
    let finalApi = ApiConstant.IMAGE_DISPLAY + 'SERVICE/' + `${benefit.qrCodeFileName}`;
    const dialogRef = this._dialog.open(PictureDialogComponent, {
      width: '350px',
      maxWidth: '85vw',
      data: {title: "QR CODE: " + benefit.name, content: finalApi}
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log("Result: ", result);
    });
  }*/
}
