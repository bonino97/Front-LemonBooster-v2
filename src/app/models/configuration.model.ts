export class Configuration {

    constructor(
        public UserId: String,
        public GitToken?: String,
        public TelegramToken?: String,
        public TelegramChatId?: String,
        public VirusTotalApiKey?: String,
        public FacebookApiKey?: String,
        public SecurityTrailsApiKey?: String
    ){  }

}