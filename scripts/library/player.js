class Player {
    constructor(playerNameObj, scoreObj, playerPlatformObj) {
        this.playerNameObj = playerNameObj;
        this.playerName = "";

        this.score = 0;
        this.scoreObj = scoreObj;

        this.playerPlatformObj = playerPlatformObj;
    }

    addPoint() {
        this.score += 1;
        this.onScorePoint();
    }

    onScorePoint() {
        return;
    }

    updateUI() {
        this.scoreObj.text = "SCORE: " + this.score;
    }

    reset(platform_x, platform_y) {
        this.score = 0;
        this.platform.active = true;
        this.platform.setPos(platform_x, platform_y);
    }

    get playerName() {
        return this.playerNameObj.text;
    }

    set playerName(val) {
        this.playerNameObj.text = val;
    }

    get platform() {
        return this.playerPlatformObj;
    }
}