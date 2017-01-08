import {REACTION_TYPE, ReactionType} from "../../common/models/questions/common/ReactionType";

export function getIconPath(reactionType: ReactionType) {
    const picsRoot = '/images/facebook/';
    let icon;
    switch (reactionType) {
        case REACTION_TYPE.Like:
            icon = picsRoot + 'thumbup_120.png';
            break;
        case REACTION_TYPE.Wow:
            icon = picsRoot + 'oh_120.png';
            break;
        case REACTION_TYPE.Haha:
            icon = picsRoot + 'lol_120.png';
            break;
        case REACTION_TYPE.Love:
            icon = picsRoot + 'love_120.png';
            break;
        case REACTION_TYPE.Sad:
            icon = picsRoot + 'cry_120.png';
            break;
        case REACTION_TYPE.Angry:
            icon = picsRoot + 'grrr_120.png';
            break;
        default:
            icon = "";
            break;
    }
    return icon;
}

export function getReactionText(reactionType: ReactionType) {
    let text;
    switch (reactionType) {
        case REACTION_TYPE.Like:
            text = "Like";
            break;
        case REACTION_TYPE.Wow:
            text = "Wow";
            break;
        case REACTION_TYPE.Haha:
            text = "Haha";
            break;
        case REACTION_TYPE.Love:
            text = "Love";
            break;
        case REACTION_TYPE.Sad:
            text = "Sad";
            break;
        case REACTION_TYPE.Angry:
            text = "Angry";
            break;
        default:
            text = "";
            break;
    }
    return text;
}
