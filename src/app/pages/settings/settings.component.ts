import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import swal from "sweetalert2";
import { Setting } from "../../models/setting.model";
import { Configuration } from "../../models/configuration.model";
import { SettingsService } from "../../services/settings.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  keysForm: FormGroup;
  loading = false;

  constructor(
    private settingService: SettingsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      IpVPS: new FormControl("", Validators.required),
    });

    this.keysForm = new FormGroup({
      GitToken: new FormControl(""),
      TelegramToken: new FormControl(""),
      TelegramChatId: new FormControl(""),
      VirusTotalApiKey: new FormControl(""),
      FacebookApiKey: new FormControl(""),
      SecurityTrailsApiKey: new FormControl(""),
    });

    this.settingService.GetSetting().subscribe(
      (data: any) => {
        this.formControls.IpVPS.setValue(data.data.IpVPS);
      },
      (err: any) => {
        console.error(err);
      }
    );

    this.getConfiguration();
  }

  get formControls(): any {
    return this.form.controls;
  }

  get keyControls(): any {
    return this.keysForm.controls;
  }

  addSettings(): any {
    this.loading = true;

    if (this.form.invalid) {
      return;
    }

    const setting = new Setting(this.form.value.IpVPS);

    this.settingService.AddSetting(setting).subscribe(
      (data: any) => {
        swal.fire({
          html: `<span style='color: gray;'>${data.msg}&nbsp;<i class="fas fa-check"></i><span>`,
          timer: 5000,
          showConfirmButton: false,
        });
        this.formControls.IpVPS.setValue(data.data.IpVPS);
        localStorage.setItem("IpVPS", data.data.IpVPS);
        this.loading = false;
        location.reload();
      },
      (error: any) => {
        swal.fire({
          html: `<span style='color:#ff8d72'>${error.error.msg}&nbsp;<i class="fas fa-times"></i><span>`,
          timer: 5000,
          showConfirmButton: false,
        });
        this.loading = false;
      }
    );
  }

  addConfiguration(): any {
    if (this.keysForm.invalid) {
      return;
    }

    this.authService.IsAuhtenticated().subscribe(
      (data: any) => {
        const configuration = new Configuration(
          data.data.UserId,
          this.keyControls.GitToken.value,
          this.keyControls.TelegramToken.value,
          this.keyControls.TelegramChatId.value,
          this.keyControls.VirusTotalApiKey.value,
          this.keyControls.FacebookApiKey.value,
          this.keyControls.SecurityTrailsApiKey.value
        );

        this.settingService.AddConfiguration(configuration).subscribe(
          (data: any) => {
            swal.fire({
              html: `<span style='color: gray;'>${data.msg}&nbsp;<i class="fas fa-check"></i><span>`,
              timer: 5000,
              showConfirmButton: false,
            });
          },
          (error: any) => {
            console.error(error);
            swal.fire({
              html: `<span style='color:#ff8d72'>${error.error.msg}&nbsp;<i class="fas fa-times"></i><span>`,
              timer: 5000,
              showConfirmButton: false,
            });
          }
        );
      },
      (err: any) => {
        console.error(err);
        swal.fire({
          html: `<span style='color:#ff8d72'>${err.error.msg}&nbsp;<i class="fas fa-times"></i><span>`,
          timer: 5000,
          showConfirmButton: false,
        });
      }
    );
  }

  getConfiguration(): any {
    this.authService.IsAuhtenticated().subscribe(
      (data: any) => {
        this.settingService.GetConfiguration(data.data.UserId).subscribe(
          (data: any) => {
            this.keyControls.GitToken.setValue(data.data.GitToken);
            this.keyControls.TelegramToken.setValue(data.data.TelegramToken);
            this.keyControls.TelegramChatId.setValue(data.data.TelegramChatId);
            this.keyControls.VirusTotalApiKey.setValue(
              data.data.VirusTotalApiKey
            );
            this.keyControls.FacebookApiKey.setValue(data.data.FacebookApiKey);
            this.keyControls.SecurityTrailsApiKey.setValue(
              data.data.SecurityTrailsApiKey
            );
          },
          (err: any) => {
            console.error(err);
            swal.fire({
              html: `<span style='color:#ff8d72'>${err.error.msg}&nbsp;<i class="fas fa-times"></i><span>`,
              timer: 5000,
              showConfirmButton: false,
            });
          }
        );
      },
      (err: any) => {
        console.error(err);
        swal.fire({
          html: `<span style='color:#ff8d72'>${err.error.msg}&nbsp;<i class="fas fa-times"></i><span>`,
          timer: 5000,
          showConfirmButton: false,
        });
      }
    );
  }
}
