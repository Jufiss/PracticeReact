export const getComments = async () => {
    return [
      {
        id: "1",
        src1:"https://bronk.club/uploads/posts/2024-01/1705941716_bronk-club-p-smeshnie-momenti-s-kotami-pinterest-39.jpg",
        body: "Платье красивое. Село по фигуре. Не маломерит.",
        username: "Мария",
        userId: "1",
        parentId: null,
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
      {
        id: "2",
        src1:"https://klopik.com/uploads/posts/2022-11/1617929573_34-p-schastlivii-kotik-36.jpg",
        body: "Платье легкое. Брала на море. Сидит идеально.",
        username: "Инна",
        userId: "2",
        parentId: null,
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
      {
        id: "3",
        src1:"https://kartinkof.club/uploads/posts/2022-04/1649851327_42-kartinkof-club-p-rzhachnie-kartinki-s-kotyatami-45.jpg",
        body: "Спасибо за комментарий. Ваше мнение важно для нас.",
        username: "Магазин",
        userId: "2",
        parentId: "1",
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
      {
        id: "4",
        src1:"https://kartinkof.club/uploads/posts/2022-04/1649851327_42-kartinkof-club-p-rzhachnie-kartinki-s-kotyatami-45.jpg",
        body: "Спасибо за комментарий. Ваше мнение важно для нас.",
        username: "Магазин",
        userId: "2",
        parentId: "2",
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
    ];
  };
  
  export const createComment = async (text, parentId = null) => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      body: text,
      parentId,
      userId: "1",
      src1:"https://koshka.top/uploads/posts/2021-12/1638584723_6-koshka-top-p-melkii-kotenok-7.jpg",
      username: "Карина",
      createdAt: new Date().toISOString(),
    };
  };
  
  export const updateComment = async (text) => {
    return { text };
  };
  
  export const deleteComment = async () => {
    return {};
  };