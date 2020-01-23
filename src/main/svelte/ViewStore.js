import { writable } from 'svelte/store';
import {home} from './pages/Home.svelte';

export const currentView = writable(home);