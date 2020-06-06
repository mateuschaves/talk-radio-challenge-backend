import app from './app';
import { Log } from './helpers';

app.listen(3000, () => Log.info(`server started on port ${process.env.PORT}`));