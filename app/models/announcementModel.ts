import { TransformKeyNames } from './transformKeyNames';

export class AttachmentModel {
  attachmentUrl: string;
  contentType: string;
  fileName: string;
  private transform = new TransformKeyNames();
  constructor(attachment?: any) {
    // Transform all underscore keynames to camelCase
    if (attachment) {
      // tslint:disable-next-line:max-line-length
      const flattenedNewAttachment = this.transform.fromUnderscoreToCamelCase(attachment);
      // console.log('The flattenedNewAnnouncement object is:', flattenedNewAttachment);
      const flattendedObjectKeys = Object.keys(flattenedNewAttachment);
      flattendedObjectKeys.forEach((key) => {
        this[key] = flattenedNewAttachment[key];
      });
      // console.log('The AnnouncementModel is:', this);

    }
  }
}

export class CommentModel {
  id: number;
  authorId: number;
  authorName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  private transform = new TransformKeyNames();
  constructor(comment?: any) {
    // Transform all underscore keynames to camelCase
    if (comment) {
      // tslint:disable-next-line:max-line-length
      const flattenedComment = this.transform.fromUnderscoreToCamelCase(comment);
      // console.log('The flattenedComment object is:', flattenedComment);
      const flattendedObjectKeys = Object.keys(flattenedComment);
      flattendedObjectKeys.forEach((key) => {
        this[key] = flattenedComment[key];
      });
      // console.log('The CommentModel is:', this);

    }
  }
}

export class AnnouncementModel {


  id: number;
  title: string;
  content: string;
  authorName: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  attachments?: AttachmentModel[];
  comments?: CommentModel[];

  private transform = new TransformKeyNames();
  constructor(newAnnouncement?: any) {

    // Transform all underscore keynames to camelCase
    if (newAnnouncement) {
      // tslint:disable-next-line:max-line-length
      const flattenedNewAnnouncement = this.transform.fromUnderscoreToCamelCase(newAnnouncement);
      // console.log('The flattenedNewAnnouncement object is:', flattenedNewAnnouncement);
      const flattendedObjectKeys = Object.keys(flattenedNewAnnouncement);
      flattendedObjectKeys.forEach((key) => {
        const object = flattenedNewAnnouncement[key];
        if (key === 'attachments' && object) {
          const temp = [];
          object.forEach(i => {
            temp.push(new AttachmentModel(i));
          });
          this[key] = temp;
        } else if (key === 'comments' && object) {
          const tempo = [];
          object.forEach(i => {
            tempo.push(new CommentModel(i));
          });
          this[key] = tempo;
        } else this[key] = object;
      });
      // console.log('The AnnouncementModel is:', this);

    }
  }
  public getAnnouncementData() {
    return this;
  }
}
