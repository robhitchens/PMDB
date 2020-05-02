import { writable } from 'svelte/store';
import {home} from '../pages/HomeService';

export const currentView = writable(home);