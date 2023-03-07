export class UserInfo{
	constructor({userName, job}) {
		this._userName = document.querySelector(userName);
		this._job = document.querySelector(job);
	}
	getUserInfo() {
		const userData = {
			userName: this._userName.textContent,
			job: this._job.textContent
		}
		return userData;
	}
	setUserInfo(userData) {
		this._userName.textContent = userData.userName;
		this._job.textContent = userData.job;
	}
}