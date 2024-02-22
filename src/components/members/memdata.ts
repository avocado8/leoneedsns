interface MemberData {
  position: string
  birthday: string
  height: string
  school: string
  hobby: string
  favorite: string
}

const Ichika: MemberData = {
  position: "Vocal & Guitar",
  birthday: "08-11",
  height: "162cm",
  school: "미야마스사카 여학원 2-A",
  hobby: "미쿠 노래 듣기",
  favorite: "야키소바빵"
}

const Saki: MemberData = {
  position: "Keyboard",
  birthday: "05-09",
  height: "160cm",
  school: "미야마스사카 여학원 2-B",
  hobby: "패션&메이크업 영상 보기",
  favorite: "스낵 과자"
}

const Honami: MemberData = {
  position: "Drum",
  birthday: "10-27",
  height: "166cm",
  school: "미야마스사카 여학원 2-A",
  hobby: "반려견 산책하기",
  favorite: "애플파이"
}


const Siho: MemberData = {
  position: "Bass",
  birthday: "01-08",
  height: "159cm",
  school: "미야마스사카 여학원 2-B",
  hobby: "걸스 밴드 라이브 가기",
  favorite: "라멘"
}


export const MembersData = [
  Ichika, Saki, Honami, Siho
]

export const MembersName = [
  "호시노 이치카", "텐마 사키", "모치즈키 호나미", "히노모리 시호"
]

export const MembersNameJpn = [
  "星乃一歌", "天馬咲希", "望月穂波", "日野森志歩"
]