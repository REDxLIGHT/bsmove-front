import React from 'react';
import Fade from '@mui/material/Fade';

import styles from './index.module.css';


// const SectionDialog = ({ handleDialog, contents = [], initialValues, validate, handleSubmit }) => {
//   const formik = useFormik({
//     initialValues,
//     validate,
//     onSubmit: values => handleSubmit(values),
//   });

//   return (
//     <>
//       <MUIDialog
//         open={true}
//         onClose={handleDialog}
//         onEscapeKeyDown={handleDialog}
//         maxWidth="lg"
//       >
//         <div className={styles.profil_dialog_container}>
//           <MUIDialogTitle>
//             <div className={styles.profil_dialog_header}>
//               <h3 className={styles.profil_dialog_title}>{messages.dialog.informations.coordonates.title}</h3>
//               <div className={styles.close_icon_container}>
//                 <IconButton onClick={handleDialog}>
//                   <S.Close />
//                 </IconButton>
//               </div>
//             </div>
//           </MUIDialogTitle>
//             <MUIDialogContent>
//               <div className={styles.profil_dialog_content}>
//                 <form onSubmit={formik.handleSubmit}>
//                   {contents.map((content) => (
//                     <>
//                     {!content.noInput && (
//                       <div className={styles.input_container}>
//                         <Input
//                           label={content.label}
//                           placeholder={messages.inputs[content.key].placeholder}
//                           error={formik?.touched[content.key] && (formik?.errors[content.key] || !!formik?.status?.errors[content.key])}
//                           name={messages.inputs[content.key].name}
//                           values={formik?.values[content.key]}
//                           value={formik?.values[content.key]}
//                           onChange={formik?.handleChange}
//                           onBlur={formik?.handleBlur}
//                           required
//                           fullWidth
//                           type={content.type}
//                         />
//                       </div>
//                     )}
//                     </>
//                   ))}
//                   <Button type="submit" disabled={formik.isSubmitting || !isObjectEmpty(formik.errors)}>
//                     {messages.action.label}
//                   </Button>
//               </form>
//             </div>
//           </MUIDialogContent>
//         </div>
//       </MUIDialog>
//     </>
//   )
// }

const SectionContainer = ({ sectionTitle = '', component: Component, ...rest }) => {
  // const formik = useFormik({
  //   initialValues,
  //   validate,
  //   onSubmit: values => handleSubmit(values),
  // });
  return (
    <Fade in={true} timeout={500}>
      <div className={styles.profil_section_container}>
        <div className={styles.profil_section_title}>{sectionTitle}</div>
        <Component {...rest} />
      </div>
    </Fade>
  )
//   return (
//     <div className={styles.profil_content_section_container}>
//       <div className={styles.profil_content_section_infos_container}>
//         <div className={styles.profil_content_section_infos_grid}>
//           {contents.map(content => (
//             <>
//               {!content.noPreview && <SectionContent {...content} /> }
//             </>
//           ))}
//         </div>
//       </div>
//       <div className={styles.profil_content_section_action_container}>
//         <div className={styles.profil_content_section_action}>
//           <Button outlined onClick={handleDialog}>{messages.action.label}</Button>
//         </div>
//       </div>
//       {
//         isDialogOpen && <SectionDialog handleDialog={handleDialog} contents={contents} {...rest} />
//       }
//     </div>
  // )
}

export default SectionContainer;
