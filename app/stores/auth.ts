// import { postApiV1Auth } from '@/composables/api/generated'
// import type { PostApiV1Auth200, PostApiV1Auth200User } from "@/types/api";
// import { defineStore } from "pinia";

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     accessToken: null as string | null,
//     user: null as PostApiV1Auth200User | null,
//   }),
//   getters: {
//     isAuthenticated: (state) =>
//       Boolean(state.user) && Boolean(state.accessToken),
//   },
//   actions: {
//     setAuthData(response: PostApiV1Auth200) {
//       this.accessToken = response.token || null;
//       this.user = response.user || null;
//     },

//     async login(initData: string) {
//       try {
//         // const response = await postApiV1Auth({ initData });

//         this.setAuthData(response);
//         return response;
//       } catch (error: any) {
//         throw new Error(error.data?.message || "Login failed");
//       }
//     },
//   },
// });
