import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { AchInvitationService } from '../services/ach-invitation.service';
import { Globals } from '../globals';
declare var $: any;
declare var $, swal: any;

@Component({
  selector: 'app-ach-list',
  templateUrl: './ach-list.component.html',
  styleUrls: ['./ach-list.component.css']
})
export class AchListComponent implements OnInit {
  userList;
  bankDetails;
  Userid;
  Name;
  addressDetails;
  constructor(private http: Http, private router: Router, public globals: Globals, private route: ActivatedRoute, private AchInvitationService: AchInvitationService) {


  }

  ngOnInit() {

    setTimeout(function () {
      if ($("body").height() < $(window).height()) {
        $('footer').addClass('footer_fixed');
      }
      else {
        $('footer').removeClass('footer_fixed');
      }
    }, 1000);

    $('#addressDetails_Modal').on('hidden.bs.modal', function () {
      $('#addressDetails_Modal').modal('hide');
      $('.right_content_block').removeClass('style_position');
    })
    $('#BankDetails_Modal').on('hidden.bs.modal', function () {
      $('#BankDetails_Modal').modal('hide');
      $('.right_content_block').removeClass('style_position');
    })

    this.globals.isLoading = true;
    this.userList = [];

    this.AchInvitationService.getUserData()
      .then((data) => {
        debugger
        //dataTables-example
        setTimeout(function () {
          var table = $('#dataTables-users').DataTable({
            // scrollY: '55vh',
            responsive: {
              details: {
                display: $.fn.dataTable.Responsive.display.childRowImmediate,
                type: ''
              }
            },
            scrollCollapse: true,
            "oLanguage": {
              "sLengthMenu": "_MENU_ Users per Page",
              "sInfo": "Showing _START_ to _END_ of _TOTAL_ Users",
              "sInfoFiltered": "(filtered from _MAX_ total Users)",
              "sInfoEmpty": "Showing 0 to 0 of 0 Users"
            },
            dom: 'lBfrtip',
            buttons: [
              {
                extend: 'excel',
                title: 'User List',
                exportOptions: {
                  columns: [0, 1, 2, 3, 4]
                }
              },
              {
                extend: 'print',
                title: 'User List',
                exportOptions: {
                  columns: [0, 1, 2, 3, 4]
                }
              },
            ]
          });
          $('.buttons-excel').attr('data-original-title', 'Export as Excel').tooltip();
          $('.buttons-print').attr('data-original-title', 'Print').tooltip();
        }, 100);

        if (data) {
          this.userList = data;
          this.globals.isLoading = false;
        } else {
          this.globals.isLoading = false;
        }
      },
        (error) => {
          this.globals.isLoading = false;
          this.router.navigate(['/pagenotfound']);
        });

  }

  ViewBankDetails(UserDetail) {
    debugger
    this.bankDetails = {};
    this.Userid = UserDetail.UserId;
    this.Name = UserDetail.FirstName;
    var user = { 'UserId': UserDetail.UserId };
    //this.globals.isLoading = true;

    this.AchInvitationService.getBankDetails(user)
      .then((data) => {
        if (data) {
          this.bankDetails = data;
        }
        //this.globals.isLoading = false;
        $('#BankDetails_Modal').modal('show');
        $('.right_content_block').addClass('style_position');
      },
        (error) => {
          alert("data not found");
          //this.globals.isLoading = false;
          this.router.navigate(['/pagenotfound']);
        });
  }

  viewAddressDetails(userid) {
    this.Userid = userid;
    this.AchInvitationService.getAddressDetails(userid)
      .then((data) => {
        if (data) {
          this.addressDetails = data;
        }
        $('#addressDetails_Modal').modal('show');
        $('.right_content_block').addClass('style_position');
      },
        (error) => {
          alert("data not found");
        })
  }


  isActiveChange(userEntity, i) {

    if (this.userList[i].IsActive == 1) {
      this.userList[i].IsActive = 0;
      userEntity.IsActive = 0;
    } else {
      this.userList[i].IsActive = 1;
      userEntity.IsActive = 1;
    }
    this.globals.isLoading = true;
    userEntity.UpdatedBy = this.globals.authData.UserId;
    debugger
    this.AchInvitationService.isActiveChange(userEntity)
      .then((data) => {
        debugger
        this.globals.isLoading = false;

        if (data['IsActive'] == 1) {
          swal({
            position: 'top-end',
            type: 'success',
            title: 'User active Successfully!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else {
          swal({
            position: 'top-end',
            type: 'success',
            title: 'User Deactive Successfully!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      },
        (error) => {
          this.globals.isLoading = false;
          this.router.navigate(['/pagenotfound']);
        });
  }

}
