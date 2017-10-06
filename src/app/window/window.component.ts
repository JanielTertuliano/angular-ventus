import { WindowService } from './window.service';
import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ModuleWithComponentFactories, Compiler, SystemJsNgModuleLoader } from '@angular/core';


declare var $: any;
declare var _;

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {

  winlist: any = [];

  constructor(private ws: WindowService, private vcRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver, private compiler: Compiler, private loader: SystemJsNgModuleLoader) { }

  ngOnInit() {
    var pos = 50;
    var num = 1;

    $('.expose-button').click(() => {
      this.ws.toggleExpose();
    });
  }



  openWindow(refComponent: string, nameComponent, id) {

    const win = this.winlist.filter((wind) => {
      return (wind === id);
    })[0];

    if(!win){

      this.winlist.push(id);

      const cur_win = this.ws.createWindow({
      title: 'Window ',
      events: {
        closed: () => {
          cur_win.destroy(); 
          this.winlist.splice(this.winlist.indexOf(id), 1);         
        }
      }
    });

    this.loader.load(refComponent)  // load the module and its components
      .then((modFac) => {
        console.log(modFac);
        // the missing step, need to use Compiler to resolve the module's embedded components
        this.compiler.compileModuleAndAllComponentsAsync<any>(modFac.moduleType)
          .then((factory) => {
            let cmpFactory: any;
            // now look for the module's main component so we can instantiate it
            for (let i = factory.componentFactories.length - 1; i >= 0; i--) {
              if (factory.componentFactories[i].componentType.name === nameComponent) {
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

    }else{
      console.log("Essa window ja está aberta");
    }

    

  }

}


