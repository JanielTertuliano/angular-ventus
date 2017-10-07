import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { WindowService } from './window.service';
import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ModuleWithComponentFactories, Compiler, SystemJsNgModuleLoader } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var $: any;
declare var _;

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {

  mainMenu: any = [];

  winlist: any = [];

  docklist: any = [];

  constructor(
    private ws: WindowService,
    private vcRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private compiler: Compiler,
    private loader: SystemJsNgModuleLoader,
    private http: Http
  ) { }

  ngOnInit() {
    var pos = 50;
    var num = 1;

    $('.expose-button').click(() => {
      this.ws.toggleExpose();
    });

    this.ws.newWindow.subscribe((dock) => {
      let jsonDock = JSON.parse(dock)
      this.docklist.push(jsonDock);
    });
    this.ws.closeWindow.subscribe((id) => {
      this.docklist.forEach((dock, index) => {
        if (dock.id === id) {
          this.docklist.splice(index, 1);
        }
      });
    });
    this.getMenu().subscribe((data)=>{
      this.mainMenu = data;
    });
  }

  getMenu(): Observable<any> {
    return this.http.get("./assets/menu.json").map((res: any) => res.json());
  }

  openWindow(itemMenu: any) {

    const win = this.winlist.filter((wind) => {
      return (wind === itemMenu.id);
    })[0];

    if (!win) {

      this.winlist.push(itemMenu.id);

      const cur_win = this.ws.createWindow({
        title: itemMenu.title,
        events: {
          closed: () => {
            cur_win.destroy();
            this.winlist.splice(this.winlist.indexOf(itemMenu.id), 1);
            this.ws.closeWindow.emit(itemMenu.id);
          }
        }
      });

      this.loader.load(itemMenu.refModule)  // load the module and its components
        .then((modFac) => {
          // the missing step, need to use Compiler to resolve the module's embedded components
          this.compiler.compileModuleAndAllComponentsAsync<any>(modFac.moduleType)
            .then((factory) => {
              let cmpFactory: any;
              // now look for the module's main component so we can instantiate it
              for (let i = factory.componentFactories.length - 1; i >= 0; i--) {
                if (factory.componentFactories[i].componentType.name === itemMenu.componentName) {
                  cmpFactory = factory.componentFactories[i];
                }
              }
              return cmpFactory;
            })
            .then(cmpFactory => {
              // need to instantiate the Module so we can use it as the provider for the new component
              let modRef = modFac.create(this.vcRef.parentInjector);
              let compRef = this.vcRef.createComponent(cmpFactory, 0);
              cur_win.el[0].querySelector('.wm-content').appendChild(compRef.location.nativeElement);
            });
        });

      this.ws.newWindow.emit(JSON.stringify(itemMenu));

    } else {
      console.log("Essa window ja está aberta");
    }



  }

}


