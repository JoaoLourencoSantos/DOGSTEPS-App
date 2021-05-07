package br.com.dogsteps.enums;

public enum EPort {

	MINI(1, "Mini (0,5 kg a 6kg) até 33 cm"),
	SMALL(2,"Pequeno (6 kg a 15 kg) até 43 cm"),
	MEDIUM(3, "Médio (15 kg a 25 kg) até 60 cm"),
	BIG(4, "Grande (25kg a 45 kg) até 70 cm");

	private int id;
	private String descricao;

	EPort(int id, String descricao) {
		this.id = id;
		this.descricao = descricao;
	}

	public int getId() {
		return id;
	}

	public String getDescricao() {
		return descricao;
	}
}
