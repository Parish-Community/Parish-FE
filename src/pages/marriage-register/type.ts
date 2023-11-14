interface DataType {
  id: number;
  courseId: number;
  partner1Id: number;
  partner2Id: number;
  rejectReason: string;
  createdAt: string;
  status: string;
  parishioner1: {
    id: number;
    christianName: string;
    fullname: string;
    gender: string;
    avatar: string;
  };
  parishioner2: {
    id: number;
    christianName: string;
    fullname: string;
    gender: string;
    avatar: string;
  };
}
