import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '../../node_modules/@angular/router';
import { appRoutes } from './routes';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { TabHeadingDirective, TabDirective, BsModalService, ComponentLoaderFactory, PositioningService } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        MemberListComponent,
        MemberDetailComponent,
        MemberEditComponent,
        MessagesComponent,
        ListsComponent, 
        RegisterComponent,
        MemberCardComponent,
        TabHeadingDirective,
        TabDirective
      ],
      imports: [RouterModule.forRoot(appRoutes), FormsModule, HttpClientModule],
      providers: [BsModalService, ComponentLoaderFactory ,PositioningService, HttpClientModule]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


});
