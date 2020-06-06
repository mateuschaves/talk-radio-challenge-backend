import app from './app';
import { Log } from './helpers';

app.listen(process.env.PORT, () => Log.info(`server started on port ${process.env.PORT}`));