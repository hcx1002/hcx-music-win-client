import type { Banner } from "@/models/banner";
import type { DjProgram, FirstMv, Personalized, PersonalizedMv, PersonalizedNewSong } from "@/models/personalized";
import type { lyric, PlayListDetail, PlaylistHighqualityTag } from "@/models/playlist";
import type { PlayListCat } from "@/models/playlist_cat";
import type { PlayHistory, PlayList, Song } from "@/models/song";
import type { SongUrl } from "@/models/song_url";
import type { TopListDetail } from "@/models/toplist_detail";
import http from "@/utils/http";
import type { Artist, Mv } from "@/models/artist";
import type { ArtistDesc, ArtistDetail } from "@/models/artist_detail";
import type { Album, AlbumList } from "@/models/album";
import type { PersonalizedPrivateContent, Video, VideoGroup } from "@/models/video";
import type { SearchHotDetail, SearchSuggest } from "@/models/search";
import type { MvCommon, MvDetail, MvUrl } from "@/models/mv";
import type { PlayListHot } from "@/models/playlist_hot";
import type { checkQRCode, UserProfile, UserQRCode, UserQRCodeKey } from "@/models/user";

export async function useLogin(phone: string, password: string) {
  return await http.get<{
    code: number,
    cookie: string,
    token: string,
  }>("login/cellphone", {phone: phone, password: password})
}

export async function useLoginStatus(cookie: string) {
  return await http.post<{
    data: {
      code: number,
      profile: UserProfile
    },
  }>("login/status", {cookie: cookie})
}

export async function useQRCodeKey() {
  return await http.get<{
    data: UserQRCodeKey
  }>("login/qr/key")
}

export async function useQRCode(key: string) {
  const {data} = await http.get<{ data: UserQRCode }>('/login/qr/create', {key: key, qrimg: '1'})
  return data
}

export async function useCheckQRCode(key: string) {
  return await http.get<checkQRCode>('/login/qr/check', {key: key})
}

export async function useSongUrl(id: number) {
  const {data} = await http.get<{ data: SongUrl[] }>('/song/url', {id: id})
  return data.first()
}

export async function useDetail(id: number) {
  const {songs} = await http.get<{ songs: Song[] }>('/song/detail', {ids: id})
  return songs.first()
}

export async function useBanner() {
  const {banners} = await http.get<{ banners: Banner[] }>('/banner', {type: 1})
  return banners
}

export async function usePersonalized() {
  const {result} = await http.get<{ result: Personalized[] }>('/personalized')
  return result
}

export async function usePersonalizedNewSong() {
  const {result} = await http.get<{ result: PersonalizedNewSong[] }>('/personalized/newsong')
  return result
}

export async function usePlayListDetail(id: number, s: number = 8) {
  const {playlist} = await http.get<{ playlist: PlayListDetail }>('/playlist/detail', {id: id, s: s})
  return playlist
}

export async function usePlayListTrackAll(id: number) {

  const {songs} = await http.get<{ songs: Song[] }>('playlist/track/all', {id: id})
  return songs
}

export async function useTopListDetail() {
  const {list} = await http.get<{ list: TopListDetail[] }>('/toplist/detail')
  return list
}

export async function usePlayListCatList() {
  const {sub, categories} = await http.get<{ sub: PlayListCat[], categories: string[] }>('playlist/catlist')

  return {sub, categories}
}

export async function userArtistList(pageData: { type: number, area: number, initial: string, page: number, limit: number }) {
  const res = await http.get<{ artists: Artist[] }>('artist/list', {
    type: pageData.type,
    area: pageData.area,
    initial: pageData.initial,
    limit: pageData.limit,
    offset: (pageData.page - 1) * pageData.limit
  })

  return res.artists
}

export async function useArtistDetail(id: number) {
  const {data} = await http.get<{ data: ArtistDetail }>('artist/detail', {id: id})
  return data
}

export async function useArtistDesc(id: number) {
  return await http.get<ArtistDesc>('artist/desc', {id: id})
}

export async function useArtistSongs(id: number, order: string = 'time', limit: number = 10, offset: number = 0) {
  return await http.get<{ songs: Song[] }>('artist/songs', {id: id, order: order, limit: limit, offset: offset})
}

export async function useArtistAlbum(id: number, limit: number = 10, offset: number = 0) {
  return await http.get<{ hotAlbums: Album[] }>('artist/album', {id: id, limit: limit, offset: offset})
}

export async function useArtistMv(id: number, limit: number = 10, offset: number = 0) {
  return await http.get<{ mvs: Mv[] }>('artist/mv', {id: id, limit: limit, offset: offset})
}

export async function useVideoTimelineRecommend(offset: number = 0) {
  const {datas} = await http.get<{ datas: Video[] }>('video/timeline/recommend', {offset: offset})
  return datas
}

export async function usePersonalizedPrivateContentList(limit: number = 10, offset: number = 0) {
  const {result} = await http.get<{ result: PersonalizedPrivateContent[] }>('personalized/privatecontent/list', {
    limit: limit,
    offset: offset
  })
  return result
}


export async function usePersonalizedMv() {
  const {result} = await http.get<{ result: PersonalizedMv[] }>('personalized/mv')
  return result
}

export async function useFirstMv(limit: number) {
  const {data} = await http.get<{ data: FirstMv[] }>('mv/first', {limit: limit})
  return data
}

//网易出品 mv
export async function useWYMv(limit: number) {
  const {data} = await http.get<{ data: FirstMv[] }>('mv/exclusive/rcmd', {limit: limit})
  return data
}

export async function usePersonalizedDjProgram() {
  const {result} = await http.get<{ result: DjProgram[] }>('personalized/djprogram')
  return result
}


export async function useVideoGroupList() {
  const {data} = await http.get<{ data: VideoGroup[] }>('video/group/list')
  return data
}

export async function useVideoGroup(id?: number, offset?: number) {
  const {datas} = await http.get<{ datas: Video[] }>(id ? 'video/group' : 'video/timeline/all', {
    id: id,
    offset: offset
  })
  return datas
}


export async function useAlbum(id: number) {
  const {album, songs} = await http.get<{ album: Album, songs: Song[] }>('album', {id: id})

  return {album, songs}
}

export async function useSearchHotDetail() {
  const {data} = await http.get<{ data: SearchHotDetail[] }>('search/hot/detail')
  return data
}

export async function useSearchSuggest(keywords: string) {
  const {result} = await http.get<{ result: SearchSuggest }>('search/suggest', {keywords: keywords})
  return result
}

export async function useMvDetail(mvid: number) {
  const {data} = await http.get<{ data: MvDetail }>("mv/detail", {mvid: mvid})
  return data
}

export async function useMvComment(id: number) {
  const {comments} = await http.get<{ comments: MvCommon[] }>("comment/mv", {id: id})
  return comments
}

export async function useMvUrl(id: number) {
  const {data} = await http.get<{ data: MvUrl }>("mv/url", {id: id})
  return data
}


export async function usePlaylistHighqualityTags() {
  const {tags} = await http.get<{ tags: PlaylistHighqualityTag[] }>("playlist/highquality/tags")

  return tags
}

export async function usePlaylistComment(id: number) {
  const {comments} = await http.get<{ comments: MvCommon[] }>("comment/playlist", {id: id})

  return comments
}

export async function usePlaylistHot() {
  const {tags} = await http.get<{ tags: PlayListHot[] }>("playlist/hot")

  return tags
}

export async function useTopPlaylistHighquality(params?: { limit?: number, before?: number, cat: string }) {
  return await http.get<{ playlists: PlayListDetail[], total: number, more: boolean, lasttime: number }>("top/playlist/highquality", params)

}

//获取歌词
export async function useSongLyric(id: number) {
  const {lrc} = await http.get<{ lrc: lyric }>("lyric", {id: id})
  return lrc
}

/************** 登录后使用的接口 ***********/
//获取用户歌单
export async function useSongList(id: number, limit?: number, offset?: number) {
  const {playlist} = await http.get<{ playlist: PlayList[] }>("user/playlist", {uid: id, limit: limit || 30, offset: offset || 0})
  return playlist
}
//获取用户播放记录
export async function useUserPlayHistory(uid: number, type?: number) {
  const {allData} = await http.get<{ allData: PlayHistory[] }>("user/record", {uid:uid,type:type||0})
  return allData
}
//喜欢音乐列表
export async function useLikeList(uid: number) {
  const {ids} = await http.post<{ ids: string[] }>("likelist", {uid:uid})
  return ids
}
export async function useDetail1(id: string) {
  const {songs} = await http.post<{ songs: Song[] }>('/song/detail', {ids: id})
  return songs
}
export async function useAlbumList(limit: number,offset:number) {
  const {data} = await http.post<{ data: AlbumList[] }>('/album/sublist', {limit: limit,offset:offset})
  return data
}
export async function useUserDJ(uid:number) {
  const {data} = await http.post<{ data: AlbumList[] }>('/user/dj', {uid: uid})
  return data
}

