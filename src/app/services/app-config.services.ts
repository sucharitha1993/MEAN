/**
 * Application config service
 */
import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {


    public studentReqUrl: string = 'http://localhost:9000/api/students/';
    public facultyReqUrl: string = 'http://localhost:9000/api/faculty/';

    public filestackConfig: any = {
        key: 'APLxYPFxySfeP94sXhTQTz'
    };

    public s3Config: any = {
        s3Key: 'xxxxxxxxxxx',
        signatureVersion: 'xx',
        bucket: {
            students: 'xxxxxxxxx',
            faculty: 'xxxxxxx',
            others: 'xxxxxxx',
            activities: 'xxxxxx'
        }
    };

    //get filestack config
    getFilestackConfig() {
        return this.filestackConfig;
    }

    //get s3 config
    getS3Config() {
        return this.s3Config;
    }
}