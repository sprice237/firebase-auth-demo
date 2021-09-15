import './firebase';
import { startServer } from './server';

startServer().then(null, (e) => console.error(e));
