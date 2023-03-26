export class UserInfo{
	constructor({userName, job, avatar}) {
		this._userName = document.querySelector(userName);
		this._job = document.querySelector(job);
		this._avatar = document.querySelector(avatar);
	}
	getUserInfo() {
		const userData = {
			name: this._userName.textContent,
			about: this._job.textContent,
			avatar: this._avatar.src
		}
		return userData;
	}
	setUserInfo(userData) {
		this._userName.textContent = userData.name;
		this._job.textContent = userData.about;
		this._avatar.src = userData.avatar;
	}
}