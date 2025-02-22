import { Date, ObjectId, Schema, model, type Document, Types } from "mongoose";

interface IReaction extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

const reactionSchema = new Schema<IReaction>({
  reactionId: { type: Types.ObjectId, default: () => new Types.ObjectId() },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt: number) => {
      return new Date(createdAt).toDateString();
    },
  },
},
    {
    toJSON: {
      getters: true,
    },
    timestamps: true,
    id: false,
  });

interface IThoughtIThawAPuttyCat extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
  reactionCount: number; //virtual
}

const thoughtSchema = new Schema<IThoughtIThawAPuttyCat>({
  thoughtText: { type: String, required: true, maxlength: 280, minlength: 1 },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt: number) => {
      return new Date(createdAt).toLocaleDateString();
    },
  },
  username: { type: String, required: true },
  reactions: [reactionSchema],
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
  toObject: { getters: true },
  timestamps: false,
},
);

thoughtSchema.virtual("reactionCount").get(function() {
  return this.reactions.length;
}
);

const Thought = model<IThoughtIThawAPuttyCat>("Thought", thoughtSchema);

export { Thought };
