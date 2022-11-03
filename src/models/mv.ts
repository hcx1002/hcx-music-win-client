import type { CommonUser } from '@/models/user'

export interface MvUrl {
  id: number
  url: string
  r: number
  size: number
  md5: string
  code: number
  expi: number
  fee: number
  mvFee: number
  st: number
  promotionVo?: any
  msg: string
}

export interface MvDetail {
  id: number
  name: string
  artistId: number
  artistName: string
  briefDesc: string
  desc: string
  cover: string
  coverId_str: string
  coverId: number
  playCount: number
  subCount: number
  shareCount: number
  commentCount: number
  duration: number
  nType: number
  publishTime: string
  price: null
  brs: IBrsItem[]
  artists: IArtistsItem[]
  commentThreadId: string
  videoGroup: []
}

export interface MvCommon {
  user: CommonUser
  status: number;
  commentId: number;
  content: string;
  time: number;
  timeStr: string;
  likedCount: number;
  ipLocation:IpLocation
}

interface IBrsItem {
  size: number
  br: number
  point: number
}

interface IArtistsItem {
  id: number
  name: string
  img1v1Url: string
  followed: boolean
}
interface IpLocation {
  ip: string
  location: string
  userId: number
}
