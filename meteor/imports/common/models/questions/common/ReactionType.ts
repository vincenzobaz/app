export type ReactionType = "PostWhoLiked" | "PostWhoWowed" | "PostWhoLaughed" | "PostWhoLoved" |
    "PostWhoGotSad" | "PostWhoGotAngry" | "PostWhoReacted" | "PostWhoCommented"

export const REACTION_TYPE = {
    Like: "PostWhoLiked" as ReactionType,
    Wow: "PostWhoWowed" as ReactionType,
    Haha: "PostWhoLaughed" as ReactionType,
    Love: "PostWhoLoved" as ReactionType,
    Sad: "PostWhoGotSad" as ReactionType,
    Angry: "PostWhoGotAngry" as ReactionType,
    Comment: "PostWhoCommented" as ReactionType,
    Reaction: "PostWhoReacted" as ReactionType
};
