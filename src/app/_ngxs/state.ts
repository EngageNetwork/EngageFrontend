import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { map } from 'rxjs/operators';

import { VideoConferenceService } from '@app/_services';

import { GET_IS_SHARING_SCREEN_DATA } from './action';

import { isSharingScreenModel } from './interface';

