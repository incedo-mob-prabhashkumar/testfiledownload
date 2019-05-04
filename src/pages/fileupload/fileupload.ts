import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera,CameraOptions  } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
/**
 * Generated class for the FileuploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fileupload',
  templateUrl: 'fileupload.html',
})
export class FileuploadPage {
  lastImage: Array<string>
  entrystr:Array<string>
  durl:Array<string>
  loading: Loading;
   count:number
   url:string;
   loadper:Array<number>;
  //public fileTransfer:FileTransferObject = this.transfer.create();
  constructor(public navCtrl: NavController, 
    private camera: Camera, 
    private transfer: FileTransfer, 
    private file: File, private filePath: FilePath, 
    public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, 
    public platform: Platform, 
    public loadingCtrl: LoadingController) {

      this.lastImage=["NA"]
      this.count=0
      this.loadper=[0]

      this.durl=[]
      this.entrystr=[""]
     }

 


  download() {

    let fileTransfer:FileTransferObject;
    fileTransfer=(this.transfer.create())
    this.durl.push(this.url)
    
    const url = this.durl[this.count]
     var n=Math.random();
    fileTransfer.download(url, this.file.dataDirectory + "file"+this.count+".pdf").then((entry) => {
      this.presentToast('file succesful downloaded.');
      console.log('download complete: ' + entry.toURL());
      this.count=this.count+1;
    }, (error) => {
      // handle error
      console.log(error)
      this.presentToast('file  download falior..');
    });

    fileTransfer.onProgress((evt)=>{
      console.log(evt)
      var perc = Math.floor(evt.loaded / evt.total * 100);
      this.loadper[this.count]=perc
      if(evt.loaded==evt.total){
       this.loadper[this.count]= 100
      }
 
   })
    
  

  }

  

 
 
  
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad FileuploadPage');
  }

}
