import { ImagePlus } from "lucide-react";
import { MemberLayout } from "../components";

function CreateArticlePage() {
  return (
    <MemberLayout
      title="Create article"
      actions={
        <>
          <button type="button" className="member-secondary-button">
            Save as draft
          </button>
          <button type="button" className="member-primary-button">
            Save and publish
          </button>
        </>
      }
    >
      <form className="create-article-form">
        <label className="member-field member-field-wide">
          Thumbnail image
          <div className="thumbnail-upload">
            <ImagePlus aria-hidden="true" />
          </div>
          <button type="button" className="member-secondary-button">
            Upload thumbnail image
          </button>
        </label>
        <label className="member-field">
          Category
          <select defaultValue="">
            <option value="" disabled>
              Select category
            </option>
            <option>Cat</option>
            <option>General</option>
            <option>Inspiration</option>
          </select>
        </label>
        <label className="member-field">
          Author name
          <input value="Thompson P." readOnly />
        </label>
        <label className="member-field member-field-wide">
          Title
          <input placeholder="Article title" />
        </label>
        <label className="member-field member-field-wide">
          Introduction (max 120 letters)
          <textarea placeholder="Introduction" />
        </label>
        <label className="member-field member-field-wide">
          Content
          <textarea className="article-content-editor" placeholder="Content" />
        </label>
      </form>
    </MemberLayout>
  );
}

export default CreateArticlePage;
