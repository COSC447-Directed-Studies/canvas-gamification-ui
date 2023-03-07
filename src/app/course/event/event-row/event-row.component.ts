import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core'
import {CourseEvent, User} from "@app/_models"
import {AuthenticationService} from "@app/_services/api/authentication"
import {
    TuiNotification,
    TuiNotificationsService,
    TuiDialogContext,
    TuiDialogService
} from "@taiga-ui/core"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {Router} from "@angular/router"
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus"

@Component({
    selector: 'app-event-row',
    templateUrl: './event-row.component.html',
    styleUrls: ['./event-row.component.scss']
})
export class EventRowComponent implements OnInit {

    @Input() event: CourseEvent
    @Output() readonly reload = new EventEmitter<boolean>()
    user: User

    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly courseEventService: CourseEventService,
        private readonly notificationsService: TuiNotificationsService,
        private router: Router,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    ) {
    }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    setFeatured() {
        return this.courseEventService.setFeatured(this.event.id).subscribe(() => {
            this.notificationsService.show('Assessment successfully marked as featured.', {
                status: TuiNotification.Success,
            }).subscribe()
            this.reload.emit(true)
        })
    }

    /**
     * Opens the dialog service based on the template passed
     * @param content - the template to be used
     * @param openDialog - the boolean condition used to check if template should be opened
     */
    openEditDialog(
        content: PolymorpheusContent<TuiDialogContext>,
        openDialog: boolean
    ): void {
        if (openDialog) {
            this.dialogService.open(content, {
                closeable: false,
                label: 'Edit finished assessment?'
            }).subscribe()
        } else {
            this.router.navigate(['/course', this.event.course, 'assignments-exams', this.event.id, 'edit']).then()
        }
    }

    /**
     * Delete an event from the course-list.
     */
    async deleteEvent(eventId: number) {
        this.courseEventService.deleteCourseEvent(eventId).subscribe()

        this.notificationsService
            .show('The assessment has been deleted successfully.', {
                status: TuiNotification.Success
            }).subscribe()
        this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() => {
            this.router.navigate(['course', this.event.course, 'assignments-exams'])
        })
    }

    /**
     * Dialog for confirming if you want to delete a question.
     * @param content - The modal to open.
     * @param eventId - The event to delete.
     */
    openDeleteEventDialog(
        content: PolymorpheusContent<TuiDialogContext>,
        eventId: number
    ): void {
        this.dialogService.open(content, {
            closeable: false,
            label: 'Delete Assessment?'
        }).subscribe(() => this.deleteEvent(eventId))
    }
}
