import { Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { IotPageComponent } from './iot-page/iot-page.component';

export const routes: Routes = [
    {
        path: '',  
        component: IotPageComponent
    },
    {
        path: 'history',
        component: HistoryComponent
    }
];
