import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './htmlEditor.css';

export interface HtmlEditorProps {
   value?: string;
   onChange?: (html: string) => void
}

const HtmlEditor: React.FC<HtmlEditorProps> = (props) => {
   const { onChange, value } = props;

   const modules = {
      toolbar: [
         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
         ['blockquote', 'code-block'],
         ['link', 'image', 'video', 'formula'],

         [{ 'header': 1 }, { 'header': 2 }],               // custom button values
         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
         [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
         [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
         [{ 'direction': 'rtl' }],                         // text direction

         [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

         [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
         [{ 'font': [] }],
         [{ 'align': [] }],

         ['clean']                                         // remove formatting button
      ]
   }

   const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
   ]



   return <ReactQuill
      className='wrapper-html-editor '
      modules={modules}
      formats={formats}
      placeholder='Informe os dados da sua ocorrência...'
      theme="snow"
      value={value || ''}
      onChange={(value) => {

         if (onChange) {
            onChange(value);
         }
      }}
   />;
}

export default HtmlEditor;