export interface PrescriptionMedication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  doctorName: string;
  clinicName: string;
  date: string;
  diagnosis: string;
  medications: PrescriptionMedication[];
}
